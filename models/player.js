const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
