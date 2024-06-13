const mongoose = require("mongoose");


const friendsSchema = new mongoose.Schema(
    {
      requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enums: ["requested", "pending", "friends"],
      },
    },
    { timestamps: true }
  );
  // inspiration from https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose
  const Friend = mongoose.model("Friend", friendsSchema);

module.exports = Friend;