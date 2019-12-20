const express = require('express');
const router = express.Router();

const CONST = require('../models/const.js');

router.post('/getlist', (req, res) => {
  CONST.find({})
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(data => {
      if (data.length === 0) {
        const newData = migration.setConstCategories(CONST);
        res.json(newData);
      } else {
        res.json(data);
      }
    });
});


module.exports = router;
