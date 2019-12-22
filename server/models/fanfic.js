const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: {
    type: Number,
    default: 0,
    min: 0
  }
});

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
  chapters: [ChapterSchema],
  images: {
    type: Object,
    required: false
  },
  stars: {
    type: Array,
    required: true
  },
  rate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('fanfics', FanficSchema);
