const mongoose = require("mongoose");

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const LineupModel = mongoose.model("Lineup", lineupSchema);

module.exports = LineupModel;
