const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM category ORDER BY "id" DESC`;
  console.log("Get text", sqlText);
  pool
    .query(sqlText)
    .then((result) => {
      console.log(`GET from database`, result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post('/', (req, res) => {
  const url = req.body.url;
  console.log("url", url);
  const sqlText = `INSERT INTO category ("url")
         VALUES ($1)`;
  pool
    .query(sqlText, [
      url
    ])
    .then((result) => {
      console.log(`Added to database`, url);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  let idToUpdate = req.params.favId;
  let category = req.body.category;
  let sqlText = `UPDATE category SET "category" = $1 WHERE "id" = $2;`;

  pool
    .query(sqlText, [category,idToUpdate])
    .then((result) => {
      console.log("Update in database", idToUpdate);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
