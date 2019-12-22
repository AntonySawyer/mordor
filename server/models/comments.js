const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  fanficId: {
    type: String,
    required: true,
  },  
  message: {
    type: String,
    required: true
  },
  datestamp: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('comments', CommentsSchema);
