const express = require('express');
const router = express.Router();

const Tag = require('../models/tags.js');
const setId = require('../utils/setId');

function getTags(res) {
  Tag.find({})
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(data => {
      res.json(setId(data));
    });
}

router.post('/save', (req, res, next) => {
  const { tags } = req.body;
  Tag.insertMany(tags),
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        getTags(res);
      }
    };
});

router.post('/get', (req, res, next) => {
  getTags(res);
});

module.exports = router;
