const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },

  link: {
    type: String,
    required: true,
  },

  like: {
    type: String,
    required: false,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false,
    default: [],
  }],

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
