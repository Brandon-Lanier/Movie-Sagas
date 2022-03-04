const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM genres ORDER BY "id" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
  res.sendStatus(500)
});

router.get('/:id', (req, res) => {
  const Id = req.params.id
  console.log('movie id is', id);
  const qryTxt = `
  SELECT ARRAY_AGG(genres.name) FROM genres
  JOIN movies_genres ON movies_genres.genre_id = genres.id
  JOIN movies ON movies_genres.movie_id = movies.id
  WHERE movies.id = $1;
  `;
  pool.query(qryTxt, [id])
  .then(result => {
    res.send(result.rows)
  }).catch(err => {
    res.sendStatus(500)
  })
})

module.exports = router;