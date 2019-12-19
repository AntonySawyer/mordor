const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },  
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true
  },  
  status: {
    type: String,
    required: true
  },  
  role: {
    type: String,
    required: true
  },  
  fanfics: {
    type: Object,
    required: false
  },  
  achieves: {
    type: Object,
    required: false
  },
  likes: {
    type: Array,
    required: false
  },
  stars: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('users', UserSchema);
