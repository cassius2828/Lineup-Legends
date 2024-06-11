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


//////////////////////////////
// GET /explore - Explore Lineup Page
//////////////////////////////
router.get("/explore", lineupCtrl.getExploreLineups);

//////////////////////////////
// GET /explore - Explore Lineup Page
//////////////////////////////
router.get("/:lineupId/rate", lineupCtrl.getRateLineup);

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
// GET /:ownerId - View User Lineups
//////////////////////////////
router.get("/:ownerId", lineupCtrl.getUserLineups);

module.exports = router;
