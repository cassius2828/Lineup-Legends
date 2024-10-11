const express = require("express");
const router = express.Router();
const playersCtrl = require("../controllers/players.js");



///////////////////////////////////////
// GET | Search Players (Initial Load)
///////////////////////////////////////
router.get("/search", playersCtrl.getSearchPlayers);
///////////////////////////////////////
// ? POST | Search Players (AJAX)
///////////////////////////////////////
router.post("/search", playersCtrl.postSearchPlayers);

///////////////////////////////////////
// GET | Sort Players 
///////////////////////////////////////
router.get("/sort-players", playersCtrl.getSortPlayers);

module.exports = router;

