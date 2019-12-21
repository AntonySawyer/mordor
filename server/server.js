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

const io = require('socket.io')();

io.on('connection', client => {
  client.on('setLike', params => {
    const { chapterId, change } = params;
    fanficModel.findOneAndUpdate(
      { 'chapters._id': chapterId },
      { $inc: { 'chapters.$.likes': change } },
      (err, rs) => {
        err && console.log(err);
        io.emit('newLikesCount', {
          targetId: chapterId,
          likes: rs.chapters.filter(el => el._id == chapterId)[0].likes + change
        });
      }
    );
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

app.listen(PORT, () => console.log(`Server is running on port = ${PORT}`));
