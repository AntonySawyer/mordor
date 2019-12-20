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
const categories = require('./routes/categories.route.js');

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
  .then(() => console.log('mongodb: connection successful'))
  .catch(err => console.error(err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

app.use('/api/users', users);
app.use('/api/fanfic', fanfic);
app.use('/api/tags', tags);
app.use('/api/categories', categories);

app.listen(PORT, () => console.log(`Server is running on port = ${PORT}`));