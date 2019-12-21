const PORT = 3001;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const migration = require('./utils/migration.js');

const usersRoute = require('./routes/user.route.js');
const fanficRoute = require('./routes/fanfic.route.js');
const tagsRoute = require('./routes/tags.route.js');
const categoriesRoute = require('./routes/categories.route.js');

const app = express();

app.use(passport.initialize());
require('./passport')(passport);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'gondorRulezz',
    saveUninitialized: true,
    resave: true
  })
);

mongoose
  .connect('mongodb://localhost/mordor')
  .then(() => {
    console.log('mongodb: connection successful');
  })
  .catch(err => console.error(err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

app.use('/api/users', usersRoute);
app.use('/api/fanfic', fanficRoute);
app.use('/api/tags', tagsRoute);
app.use('/api/categories', categoriesRoute);

const fanficModel = require('./models/fanfic.js');
const userModel = require('./models/user.js');

const io = require('socket.io')();

io.on('connection', client => {
  client.on('setLike', params => {
    const { chapterId, change, userId } = params;
    fanficModel.findOneAndUpdate(
      { 'chapters._id': chapterId },
      { $inc: { 'chapters.$.likes': change } },
      (err, rs) => {
        err && console.log(err);
        io.emit('newLikesCount', {
          chapterId,
          likes: rs.chapters.filter(el => el._id == chapterId)[0].likes + change
        });
      }
    );
    const updateParam =
      change > 0
        ? { $addToSet: { likes: chapterId } }
        : { $pull: { likes: chapterId } };
    userModel.findOneAndUpdate(
      { _id: userId },
      updateParam,
      (err, rs) => err && console.log(err)
    );
  });
  client.on('setStar', params => {
    const { fanficId, oldRating, newRating, userId } = params;
    fanficModel
      .find({ _id: fanficId })
      .then(rs => JSON.parse(JSON.stringify(rs)))
      .then(data => {
        const newStars = data[0].stars.slice(0).map((el, index) => {
          if (oldRating !== newRating) {
            if (index + 1 === newRating) {
              return el + 1;
            } else if (index + 1 === oldRating) {
              return el - 1;
            } else {
              return el;
            }
          } else {
            return el;
          }
        });
        const votes = newStars.reduce((a, b) => a + b, 0);
        const sum = newStars
          .map((el, i) => el * (i + 1))
          .reduce((a, b) => a + b, 0);
        const newRate = (sum / votes).toFixed(2);
        fanficModel.findOneAndUpdate(
          { _id: fanficId },
          { $set: { stars: newStars, rate: newRate } },
          (err, rs) => {
            err && console.log(err);
            io.emit('newRate', {
              fanficId,
              stars: newStars
            });
          }
        );
        userModel
          .find({ _id: userId })
          .then(rs => JSON.parse(JSON.stringify(rs)))
          .then(data => {
            if (
              data[0].stars.filter(el => el.fanficId == fanficId).length > 0
            ) {
              const newStarsForUserData = data[0].stars.some(
                el => el.fanficId == fanficId
              )
                ? [
                    ...data[0].stars.filter(el => el.fanficId != fanficId),
                    { fanficId, value: newRating }
                  ]
                : [...data[0].stars, { fanficId, value: newRating }];
              userModel.findOneAndUpdate(
                { _id: userId },
                { $set: { stars: newStarsForUserData } },
                (err, rs) => err && console.log(err)
              );
            } else {
              userModel.findOneAndUpdate(
                { _id: userId },
                { $push: { stars: { fanficId, value: newRating } } },
                (err, rs) => err && console.log(err)
              );
            }
          });
      });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

app.listen(PORT, () => console.log(`Server is running on port = ${PORT}`));
