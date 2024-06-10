const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
  });
  
const lineupSchema = new mongoose.Schema({
  pg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  sg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  sf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  pf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", 
  },
  c: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", 
  },
  featured: {
    type: Boolean,
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

const LineupModel = mongoose.model("Lineup", lineupSchema);

module.exports = LineupModel;
