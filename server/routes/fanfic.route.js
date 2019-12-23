const express = require('express');
const router = express.Router();

const Fanfic = require('../models/fanfic.js');
const Comments = require('../models/comments.js');
const setId = require('../utils/setId');

function getFanfic(id, res) {
  Fanfic.find({ _id: id })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => {
      const result = fanfics[0];
      Comments.find({ fanficId: id })
        .then(rs => JSON.parse(JSON.stringify(rs)))
        .then(comments => (result.comments = comments.slice(0)))
        .then(data => res.json(result));
    });
}

router.post('/lastUpdated', (req, res) => {
  Fanfic.find({}, { title: 1, datestamp: 1, shortDescr: 1 })
    .sort({ datestamp: -1 })
    .limit(5)
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => {
      fanfics = setId(fanfics);
      res.json(fanfics);
    });
});

router.post('/maxRated', (req, res) => {
  Fanfic.find({}, { title: 1, rate: 1, shortDescr: 1 })
    .sort({ rate: -1 })
    .limit(5)
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => {
      fanfics = setId(fanfics);
      res.json(fanfics);
    });
});

router.post('/get', (req, res, next) => {
  getFanfic(req.body.id, res);
});

router.post('/delete', (req, res) => {
  Fanfic.deleteMany({ _id: { $in: req.body.ids } }, (err, rs) => {
    err && console.log(err);
    Fanfic.find({ userId: req.body.userId }, { title: 1 })
      .then(rs => JSON.parse(JSON.stringify(rs)))
      .then(fanfics => res.json(fanfics.map(el => ({ ...el, id: el._id }))));
  });
});

router.post('/save', (req, res, next) => {
  const {
    id,
    title,
    tags,
    category,
    shortDescr,
    userId,
    chapters,
    images,
    stars
  } = req.body;
  if (id === 'new') {
    Fanfic.create(
      {
        title,
        userId,
        tags,
        category,
        shortDescr,
        datestamp: Date.now(),
        chapters,
        images,
        stars
      },
      (err, data) => {
        if (err) {
          console.log(err); // error handler for client, dont clean store before write succesfully!
        } else {
          // socket - last updated, table in profile of author (for admin and user)
          res.redirect(`/fanfic/read/${data._id}`);
        }
      }
    );
  } else {
    Fanfic.updateMany(
      { _id: id },
      {
        $set: {
          title: title,
          tags: tags,
          category: category,
          chapters: chapters,
          images: images,
          stars: stars
        }
      },
      { upsert: true, setDefaultsOnInsert: true },
      (err, rs) => {
        err && console.log(err);
      }
    );
    getFanfic(id, res);
  }
});

router.post('/byTag', (req, res) => {
  Fanfic.find({ tags: req.body.tag }, { title: 1, shortDescr: 1 })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => res.json(setId(fanfics)));
});

router.post('/byCategory', (req, res) => {
  Fanfic.find({ category: req.body.category }, { title: 1, shortDescr: 1 })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => res.json(setId(fanfics)));
});

router.post('/byText', (req, res) => {
  Fanfic.find({ $text: { $search: req.body.str } }, { title: 1, shortDescr: 1 })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(fanfics => res.json(setId(fanfics)));
});

module.exports = router;
