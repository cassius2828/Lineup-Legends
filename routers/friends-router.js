const express = require("express");
const router = express.Router();
const friendsCtrl = require("../controllers/friends");



// ///////////////////////////
// GET -- search lineups
// ///////////////////////////
router.get('/', friendsCtrl.getSearchFriends);

// ///////////////////////////
// GET -- friend lineups
// ///////////////////////////
router.get('/lineups/:friendId', friendsCtrl.getFriendLineups)

// ///////////////////////////
// ? POST -- add friend
// ///////////////////////////
router.post('/:targetedUserId/add-friend', friendsCtrl.postAddFriend)

// ///////////////////////////
// GET -- friend reqs
// ///////////////////////////
router.get('/:ownerId/friend-requests', friendsCtrl.getFriendRequests)

module.exports = router;
