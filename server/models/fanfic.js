const mongoose = require('mongoose');

const FanficSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    unique: false,
    required: true
  },
  shortDescr: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  datestamp: {
    type: Date,
    required: true
  },
  chapters: {
    type: Array,
    required: true
  },
  images: {
    type: Object,
    required: false
  },
  stars: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('fanfics', FanficSchema);
