const express = require("express");
const router = express.Router();
const lineupCtrl = require("../controllers/lineups.js");

//////////////////////////////
// GET /new - Create New Lineup Page
//////////////////////////////
router.get("/new", lineupCtrl.getNewLineup);

//////////////////////////////
// ? POST /new - Create New Lineup
//////////////////////////////
router.post("/new", lineupCtrl.postNewLineup);

//////////////////////////////
// ? POST /new - Create New Lineup
//////////////////////////////
router.post("/new/reorder", lineupCtrl.postNewLineupRedirectToReorderLineup);

// router.get('/addplayers', lineupCtrl.addPlayers)
//////////////////////////////
// GET /explore - Explore Lineup Page
//////////////////////////////
router.get("/explore", lineupCtrl.getExploreLineups);

//////////////////////////////
// GET /:lineupId/rate - Rate Lineup
//////////////////////////////
router.get("/:lineupId/rate", lineupCtrl.getRateLineup);

//////////////////////////////
// ? POST /explore - Rate Lineup
//////////////////////////////
router.post("/:lineupId/rate", lineupCtrl.postRateLineup);

//////////////////////////////
// ? POST /vote - upvote Lineup
//////////////////////////////
router.post("/:lineupId/upvote", lineupCtrl.postUpvoteLineup);

//////////////////////////////
// ? POST /vote - downvote Lineup
//////////////////////////////
router.post("/:lineupId/downvote", lineupCtrl.postDownvoteLineup);

//////////////////////////////
// ? POST /vote - upvote comment
//////////////////////////////
router.post("/:lineupId/comment/upvote", lineupCtrl.postUpvoteComments);

//////////////////////////////
// ? POST /vote - downvote comment
//////////////////////////////
router.post("/:lineupId/comment/downvote", lineupCtrl.postDownvoteComments);

//////////////////////////////
// ? POST /vote - upvote thread/:threadId
//////////////////////////////
router.post("/:lineupId/thread/:threadId/upvote", lineupCtrl.postUpvoteThread);

//////////////////////////////
// ? POST /vote - downvote thread/:threadId
//////////////////////////////
router.post("/:lineupId/thread/:threadId/downvote", lineupCtrl.postDownvoteThread);


//////////////////////////////
// * PUT /:lineupId/featured- Feature Lineup
//////////////////////////////
router.put("/:lineupId/edit/featured", lineupCtrl.putFeatureLineup);

//////////////////////////////
// GET /:lineupId/edit - Edit Lineup Page
//////////////////////////////
router.get("/:lineupId/edit", lineupCtrl.getEditLineup);

//////////////////////////////
// ! DELETE /:lineupId/edit - Delete Lineup
//////////////////////////////
router.delete("/:lineupId/edit", lineupCtrl.deleteLineup);

//////////////////////////////
// * PUT /:lineupId/move-players - Update Gamble Lineup Page
//////////////////////////////
router.put("/:lineupId/edit/reorder-lineup", lineupCtrl.reorderLineup);

//////////////////////////////
// GET /:lineupId/gamble/:playerid  - Gamble Lineup Page
//////////////////////////////
router.get("/:lineupId/gamble/:playerId", lineupCtrl.getGamblePlayer);

//////////////////////////////
// * PUT /:lineupId/gamble/:playerid - Update Gamble Lineup Page
//////////////////////////////
router.put("/:lineupId/gamble/:playerId", lineupCtrl.putGamblePlayer);

//////////////////////////////
// GET /:lineupId/comment
//////////////////////////////
router.get("/:lineupId/comment", lineupCtrl.getLineupComment);

//////////////////////////////
// POST /:lineupId/comment
//////////////////////////////
router.post("/:lineupId/comment/new", lineupCtrl.postLineupComment);

//////////////////////////////
// POST /:lineupId/comment/:commentId/thread/new
//////////////////////////////
router.post("/:lineupId/comment/:commentId/thread/new", lineupCtrl.postNewThread);

//////////////////////////////
// GET /:ownerId - View User Lineups
//////////////////////////////
router.get("/:ownerId", lineupCtrl.getUserLineups);

//////////////////////////////
// GET /explore/sort-lineups - View User Lineups
//////////////////////////////
router.get("/explore/sort-lineups", lineupCtrl.getSortExploreLineups);
//////////////////////////////
// GET /:ownerId/sort-lineups - View User Lineups
//////////////////////////////
router.get("/:ownerId/sort-lineups", lineupCtrl.getSortUserLineups);

module.exports = router;
