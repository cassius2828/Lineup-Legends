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
  res.render("friends/index.ejs", { users, message: false });
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
  const friends = await findFriends(req, res);

  const { targetedUserId } = req.params;
  const currentUserId = req.session.user._id;
  const users = await UserModel.find({
    _id: {
      $nin: [...friends, currentUserId],
    },
  });
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

  res.render("friends/index.ejs", { users, message: "Friend request sent!" });
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
    { $push: { friends: targetedUserId } }
  );

  const updateOtherUserFriends = await UserModel.findOneAndUpdate(
    { _id: targetedUserId },
    { $push: { friends: currentUserId } }
  );
  res.redirect(`/friends/${currentUserId}`);
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
  res.render('friends/index.ejs',{message:"friend req rejected"});
};

//////////////////////////////
// ! DELETE remove friend
//////////////////////////////
const removeFriend = async (req, res) => {
  const userId = req.session.user._id;
  const { targetedUserId } = req.params;

  // remove friend from user friends list
  await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { $pull: { friends: targetedUserId } }
  );
  // remove user from friends friend list
  await UserModel.findOneAndUpdate(
    {
      _id: targetedUserId,
    },
    { $pull: { friends: userId } }
  );

  // delete the friendship confirmation out the friend collection
  await FriendModel.findOneAndDelete({
    recipient: userId,
    requester: targetedUserId,
    status: "accepted",
  });
  await FriendModel.findOneAndDelete({
    recipient: userId,
    requester: targetedUserId,
    status: "accepted",
  });

  res.redirect(`/friends/${userId}`);
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
//////////////////////////////
// GET friend requests
//////////////////////////////
const getFriendRequests = async (req, res) => {
  try {
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

//////////////////////////////
// GET search friends
//////////////////////////////
const getSearchCurrentFriends = async (req, res) => {
  const { query } = req.body;
  const currentUserId = req.session.user._id;
  console.log(query);
  try {
    let user = await UserModel.findById(currentUserId).populate("friends");
    user = user.friends;
    if (user) {
      const filteredFriends = user.filter((friend) =>
        friend.username.toLowerCase().includes(query.toLowerCase())
      );
      return res.json(filteredFriends);
    } else {
      return res.status(404).send("Friends list not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Unable to display search results");
  }
};

//////////////////////////////
// GET all users search for friends
//////////////////////////////
const getAllUsersSearchForFriends = async (req, res) => {
  const { query } = req.body;
  const currentUserId = req.session.user._id;

  try {
    // Retrieve the current user's friends list
    const currentUser = await UserModel.findById(currentUserId).select(
      "friends"
    );
    const friendsIds = currentUser.friends;

    // Find all users who are not friends with the current user and match the query
    let users = await UserModel.aggregate([
      // step 1
      {
        $match: {
          _id: { $nin: friendsIds, $ne: currentUserId }, // Exclude friends and the current user
        },
      },
      // step 2
      {
        $match: {
          username: { $regex: query, $options: "i" }, // Case-insensitive search for the username
        },
      },
      // step 3
      {
        $project: {
          _id: 1,
          username: 1,
          // Add any other fields you want to return
        },
      },
    ]);

    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({message:"users not found"});
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({message:"Unable to display search results"});
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
  removeFriend,
  getSearchCurrentFriends,
  getAllUsersSearchForFriends,
};

async function findFriends(req, res) {
  try {
    const currentUserId = req.session.user._id;
    let user = await UserModel.findById(currentUserId).select('friends').populate("friends");
    user = user.friends;
    return user;
  } catch (err) {
    console.error(err);
    res.status(500).send("unable to find friends");
  }
}
