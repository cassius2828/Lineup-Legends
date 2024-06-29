const express = require("express");
const router = express.Router();
const friendsCtrl = require("../controllers/friends");

// ///////////////////////////
// GET -- search lineups
// ///////////////////////////
router.get("/", friendsCtrl.getSearchFriends);

// ///////////////////////////
// ? POST -- search all users for friends
// ///////////////////////////
router.post("/", friendsCtrl.getAllUsersSearchForFriends);

// ///////////////////////////
// GET -- friend lineups
// ///////////////////////////
router.get("/lineups/:friendId", friendsCtrl.getFriendLineups);

// ///////////////////////////
// ? POST -- add friend
// ///////////////////////////
router.post("/:targetedUserId/add-friend", friendsCtrl.postAddFriend);

// ///////////////////////////
// GET -- friend reqs
// ///////////////////////////
router.get("/:ownerId/friend-requests", friendsCtrl.getFriendRequests);

// ///////////////////////////
// * PUT -- friend reqs
// ///////////////////////////
router.put("/:targetedUserId/accept-request", friendsCtrl.putAcceptFriendReq);

// ///////////////////////////
// ! DELETE -- friend reqs
// ///////////////////////////
router.delete(
  "/:targetedUserId/reject-request",
  friendsCtrl.deleteRejectFriendReq
);

// ///////////////////////////
// ! DELETE -- friend
// ///////////////////////////
router.delete("/:targetedUserId", friendsCtrl.removeFriend);

// ///////////////////////////
// ? POST -- search current friends
// ///////////////////////////
router.post("/:userId/search-friends", friendsCtrl.getSearchCurrentFriends);




// ///////////////////////////
// GET -- edit friends
// ///////////////////////////
router.get("/:userId", friendsCtrl.getEditFriends);

module.exports = router;
