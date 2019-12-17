const mongoose = require('mongoose');

const ConstSchema = new mongoose.Schema({
  categories: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('const', ConstSchema);
