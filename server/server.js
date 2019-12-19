const PORT = 3001;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const migration = require('./utils/migration.js');

const users = require('./routes/user.route.js');
const fanfic = require('./routes/fanfic.route.js');
const tags = require('./routes/tags.route.js');

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

app.use('/api/users', users);
app.use('/api/fanfic', fanfic);
app.use('/api/tags', tags);


mongoose
  .connect('mongodb://localhost/mordor')
  .then(() => console.log('mongodb: connection successful'))
  .catch(err => console.error(err));

const User = require('./models/user');
const Fanfic = require('./models/fanfic');
const Comment = require('./models/coments');
const CONST = require('./models/const.js');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});


app.post('/getProfile', (req, res) => {
  const id = req.body.id.toString();
  User.findOne({ _id: id })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(user => {
      Fanfic.find({ userId: id }, { title: 1 })
        .then(rs => JSON.parse(JSON.stringify(rs)))
        .then(fanfics => {
          const result = {
            userdata: {
              username: user.username,
              email: user.email,
              role: user.role,
              id: user._id
            },
            achieves: user.achieves,
            fanfics: fanfics.map(el => ({ ...el, id: el._id }))
          };
          res.json(result);
        });
    });
});

app.post('/getConst', (req, res) => {
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


app.listen(PORT, () => console.log(`Server is running on port = ${PORT}`));
