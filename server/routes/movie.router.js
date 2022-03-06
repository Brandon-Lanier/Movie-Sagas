const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  const qryTxt = `SELECT * FROM movies WHERE id = $1;`
  pool.query(qryTxt, [id])
    .then(result => {
      res.send(result.rows)
    }).catch(err => {
      console.log('Error getting movie details', err);
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  console.log('Genre id on server', req.body.genres);
  const qryTxt = `
  INSERT INTO movies (title, poster, description)
  VALUES ($1, $2, $3)
  RETURNING id;`
  // Returning will give us the new assigned ID from Database
  pool.query(qryTxt, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
      const newMovieId = result.rows[0].id

      // Now handle the genre reference
      const genresTxt = `
      INSERT INTO movies_genres (movie_id, genre_id)
      VALUES  ($1, $2);
      `
      // Second query to handle adding to the movies_genre database
      pool.query(genresTxt, [newMovieId, req.body.genres]).then(result => {
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const qryTxt = `
  UPDATE movies 
  SET title = $1,
  description = $2
  WHERE id = $3;
  `
  pool.query(qryTxt, [title, description, id])
    .then(result => {
      res.sendStatus(200)
    }).catch(err => {
      res.sendStatus(500)
    })
})


module.exports = router;