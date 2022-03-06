const express = require('express');
const { query } = require('../modules/pool');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM genres ORDER BY name ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    }).catch(err => {
      res.sendStatus(500)
    })
});

router.get('/selected/:id', (req, res) => {
  const id = req.params.id
  console.log('movie id is', id);
  const qryTxt = `
  SELECT genres.name FROM genres
  JOIN movies_genres ON movies_genres.genre_id = genres.id
  JOIN movies ON movies_genres.movie_id = movies.id
  WHERE movies.id = $1;
  `;
  pool.query(qryTxt, [id])
  .then(result => {
    // console.log('Result is', result.rows)
    res.send(result.rows)
  }).catch(err => {
    res.sendStatus(500)
  })
})

router.get('/match', (req, res) => {
  console.log('query', req.query.genre);
  const genre = req.query.genre;
  const qryTxt = `
  SELECT * FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id = genres.id
  WHERE genres.name = $1;
  `
  pool.query(qryTxt, [genre])
  .then(result => {
    console.log(result.rows);
    res.send(result.rows)
  }).catch(error => {
    res.sendStatus(500);
  })
})

module.exports = router;