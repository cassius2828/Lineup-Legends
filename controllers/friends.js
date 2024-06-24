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
  const friends = await findFriends(req, res);
  const userId = req.session.user._id;
  // Find users who are not your friends and are not you
  const users = await UserModel.find({
    _id: {
      $nin: [...friends, userId],
    },
  });
  console.log(users);
  res.render("friends/index.ejs", { users });
};

//////////////////////////////
// GET edit friends
//////////////////////////////
const getEditFriends = async (req, res) => {
  const friends = await findFriends(req, res);

  console.log(friends);
  res.render("friends/edit.ejs", { friends });
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
    { $set: { status: "pending" } },
    // updates if exists or inserts if it does not exist
    { upsert: true, new: true }
  );
  // receive the request from current user (to targeted user)
  const recievedFriendReqDoc = await FriendModel.findOneAndUpdate(
    { recipient: currentUserId, requester: targetedUserId },
    { $set: { status: "requested" } },
    { upsert: true, new: true }
  );

  res.send("friend request sent");
};

//////////////////////////////
// * PUT accept friend request
//////////////////////////////
const putAcceptFriendReq = async (req, res) => {
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
  await FriendModel.findOneAndDelete({
    requester: currentUserId,
    recipient: targetedUserId,
    status: "pending",
  });
  await FriendModel.findOneAndDelete({
    recipient: currentUserId,
    requester: targetedUserId,
    status: "requested",
  });

  const updateCurrentUserFriends = await UserModel.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { friends: targetedUserId} }
  );

  const updateOtherUserFriends = await UserModel.findOneAndUpdate(
    { _id: targetedUserId },
    { $push: { friends: currentUserId } }
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

const getFriendRequests = async (req, res) => {
  try {
    //          const friendRequestDocs = await FriendModel.aggregate([
    //     {
    //       $match: { recipient: req.session.user._id, status: "pending" },
    //     },
    //   ]);

    const friendRequestDocs = await FriendModel.find({
      recipient: req.session.user._id,
      status: "pending",
    }).populate("requester");
    console.log(friendRequestDocs);
    res.render("friends/handle-requests.ejs", {
      friendRequests: friendRequestDocs,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).send("unable to find document");
  }
};

module.exports = {
  getSearchFriends,
  postAddFriend,
  getFriendLineups,
  putAcceptFriendReq,
  deleteRejectFriendReq,
  getFriendRequests,
  getEditFriends,
};

async function findFriends(req, res) {
  const currentUserId = req.session.user._id;
  const friends = await FriendModel.find({
    requester: currentUserId,
    status: "accepted",
  });
  let friendsIds = friends.map((friend) => friend.recipient);
  const users = await UserModel.aggregate([
    {
      $match: { _id: { $in: friendsIds } },
    },
  ]);
  return users;
}
