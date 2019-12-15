const PORT = 3001;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

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

mongoose
  .connect('mongodb://localhost/mordor')
  .then(() => console.log('mongodb: connection successful'))
  .catch(err => console.error(err));

const User = require('./models/user');
const Fanfic = require('./models/fanfic');
const Comment = require('./models/coments');

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
  new LocalStrategy(function(email, password, done) {
    console.log(`search for ${email}`);
    User.findOne({ email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

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

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth' }),
  function(req, res) {
    console.log('in login post');
    res.redirect('/profile');
  }
);

app.post('/register', (req, res, next) => {
  const { email, password, username } = req.body;
  User.create(
    {
      email: email,
      password: password,
      username: username,
      role: 'user',
      verified: false,
      status: 'blocked'
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
    message.email = !emailExist;
    User.findOne({ username })
      .then(usernameExist => (message.username = !usernameExist))
      .then(rs => res.json(message));
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/getProfile', (req, res) => {
  const id = req.body.id.toString();
  User.findOne({ _id: id })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(data => {
      const result = {
        userdata: {
          username: data.username,
          email: data.email,
          role: data.role,
          id: data._id
        },
        achieves: data.achieves,
        fanfics: data.fanfics
      };
      res.json(result);
    });
});

app.post('/fanfic/add', (req, res, next) => {
  const { title, userId, tags, rate, datestamp, chapters, images } = req.body;
  Fanfic.create(
    {
      title: title,
      userId: userId,
      tags: tags,
      rate: rate,
      datestamp: Date.now(),
      chapters: chapters,
      images: images
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

function getUserlist(res) {
  User.find({}, { username: 1, status: 1, email: 1, role: 1 })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(data => {
      console.log(data);
      res.json({ userlist: data });
    });
}

app.post('/getUsers', (req, res) => {
  getUserlist(res);
});

app.post('/users/delete', (req, res) => {
  User.deleteMany({ _id: { $in: req.body.ids } }, (err, rs) => {
    err && console.log(err);
    getUserlist(res);
  });
});

app.post('/users/toadmin', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { role: 'admin' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

app.post('/users/touser', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { role: 'user' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

app.post('/users/block', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { status: 'blocked' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

app.post('/users/unblock', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { status: 'active' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
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
