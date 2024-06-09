const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  lineup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lineup",
  },
  comments: [commentSchema],
  rating: {
    type: Number,
  },
  votes: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
