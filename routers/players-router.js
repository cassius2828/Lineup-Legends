const express = require("express");
const router = express.Router();
const playersCtrl = require("../controllers/players.js");




router.get("/search", playersCtrl.getSearchPlayers);
router.post("/search", playersCtrl.postSearchPlayers);


module.exports = router;

