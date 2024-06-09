const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  lineup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lineup'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  rating: {
    type: Number
  },
  votes: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
