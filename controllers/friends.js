const { formatDistanceToNow } = require("date-fns");
const FriendModel = require("../models/friend.js");
const LineupModel = require("../models/lineup.js");
const UserModel = require("../models/user.js");
const mongoose = require("mongoose");

const { getRelativeTime } = require("./lineups.js");

//////////////////////////////
// GET search friends
//////////////////////////////
const getSearchFriends = async (req, res) => {
  const users = await UserModel.find({});
  console.log(users);
  res.render("friends/index.ejs", { users });
};

//////////////////////////////
// ? POST add friend
//////////////////////////////
const postAddFriend = async (req, res) => {
  const { targetedUserId } = req.params;
  const currentUserId = req.session.user._id;

  //   send req by current user
  const sentFriendReqDoc = await FriendModel.findOneAndUpdate(
    { requester: currentUserId, recipient: targetedUserId },
    { $set: { status: "requested" } },
    // updates if exists or inserts if it does not exist
    { upsert: true, new: true }
  );
  // receive the request from current user (to targeted user)
  const recievedFriendReqDoc = await FriendModel.findOneAndUpdate(
    { recipient: currentUserId, requester: targetedUserId },
    { $set: { status: "pending" } },
    { upsert: true, new: true }
  );

  const updateSenderOfFriendReq = await UserModel.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { friends: sentFriendReqDoc._id } }
  );

  const updateRecipientOfFriendReq = await UserModel.findOneAndUpdate(
    { _id: targetedUserId },
    { $push: { friends: recievedFriendReqDoc._id } }
  );
  res.send("friend request sent");
};

//////////////////////////////
// ? POST accept friend request
//////////////////////////////
const postAcceptFriendReq = async (req, res) => {
  const { targetedUserId } = req.params;
  const currentUserId = req.session.user._id;
  await FriendModel.findOneAndUpdate(
    { requester: currentUserId, recipient: targetedUserId },
    { $set: { status: "accepted" } }
  );
  await FriendModel.findOneAndUpdate(
    { recipient: currentUserId, requester: targetedUserId },
    { $set: { status: "accepted" } }
  );
  res.send("friend req accepted");
};

//////////////////////////////
// ! DELETE reject friend request
//////////////////////////////
const deleteRejectFriendReq = async (req, res) => {
  const { targetedUserId } = req.params;
  const currentUserId = req.session.user._id;
  const sentFriendReqDoc = await FriendModel.findOneAndDelete({
    requester: currentUserId,
    recipient: targetedUserId,
  });
  const recievedFriendReqDoc = await FriendModel.findOneAndDelete({
    recipient: currentUserId,
    requester: targetedUserId,
  });
  const updateSenderOfFriendReq = await UserModel.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { friends: sentFriendReqDoc._id } }
  );
  const updateRecipientOfFriendReq = await UserModel.findOneAndUpdate(
    { _id: targetedUserId },
    { $pull: { friends: recievedFriendReqDoc._id } }
  );
  res.send("friend req rejected");
};

//////////////////////////////
// GET friend lineups
//////////////////////////////
const getFriendLineups = async (req, res) => {
  const { friendId } = req.params;
  let lineups = await LineupModel.find({ owner: friendId })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c")
    .populate("owner");
  lineups = await getRelativeTime(lineups);
  res.render("friends/lineups.ejs", { lineups });
};

module.exports = {
  getSearchFriends,
  postAddFriend,
  getFriendLineups,
  postAcceptFriendReq,
  deleteRejectFriendReq,
};
