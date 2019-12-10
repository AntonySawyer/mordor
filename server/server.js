const PORT = 3001;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

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
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   console.log('setHeader cors');
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// });

mongoose
  .connect('mongodb://localhost/mordor')
  .then(() => console.log('mongodb: connection successful'))
  .catch(err => console.error(err));

const User = require('./models/user');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Passport:
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log('in local str');
    User.findOrCreate(
      {
        username
      },
      {
        username,
        password
      },
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }
        if (user.doc.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
  })
);

// Auth system
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) =>
    err
      ? next(err)
      : user
      ? req.logIn(user, function(err) {
          return err ? next(err) : res.redirect('/profile');
        })
      : res.redirect('/profile')
  )(req, res, next);
});

app.post('/register', (req, res, next) => {
  const { email, password, username } = req.body;
  User.create(
    {
      email: email,
      password: password,
      username: username,
      verified: false
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/profile');
      }
    }
  );
});

app.post('/valid', function(req, res, next) {
  const message = {};
  const { email, username } = req.body;
  User.findOne({ email }).then(emailExist => {
    message.email = !!emailExist;
    User.findOne({ username })
      .then(usernameExist => (message.username = !!usernameExist))
      .then(rs => res.json(message));
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// function mustAuthenticatedMw(req, res, next) {
//   if (req.isAuthenticated()) {
//     newUserName = req.user.doc.username;
//     res.sendFile(path.join(`${__dirname}/public/chat.html`));

//   } else {
//     res.redirect('/');
//   }
// }

// app.get('/chat', mustAuthenticatedMw);

app.listen(PORT, () => console.log(`Server is running on port = ${PORT}`));
