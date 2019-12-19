const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/user');

function getUserlist(res) {
  User.find({}, { username: 1, status: 1, email: 1, role: 1 })
    .then(rs => JSON.parse(JSON.stringify(rs)))
    .then(data => {
      res.json({ userlist: data });
    });
}

router.post('/register', function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar,
        role: 'user',
        verified: false,
        status: 'blocked'
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          role: user.role,
          verified: user.verified,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          'secret',
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error('There is some error in token', err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.password = 'Incorrect Password';
        return res.status(400).json(errors);
      }
    });
  });
});

router.post('/userlist', (req, res) => {
  getUserlist(res);
});

router.post('/delete', (req, res) => {
  User.deleteMany({ _id: { $in: req.body.ids } }, (err, rs) => {
    err && console.log(err);
    getUserlist(res);
  });
});

router.post('/toadmin', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { role: 'admin' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

router.post('/touser', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { role: 'user' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

router.post('/block', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { status: 'blocked' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

router.post('/unblock', (req, res) => {
  User.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { status: 'active' } },
    (err, rs) => {
      err && console.log(err);
      getUserlist(res);
    }
  );
});

module.exports = router;
