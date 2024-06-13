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
router.post('/:otherUserId/add-friend', friendsCtrl.postAddFriend)

module.exports = router;
