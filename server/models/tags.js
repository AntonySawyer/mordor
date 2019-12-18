const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

module.exports = mongoose.model('tags', TagsSchema);
