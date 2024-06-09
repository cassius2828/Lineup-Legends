const express = require("express");
const router = express.Router();
const lineupCtrl = require("../controllers/lineups.js");
const PlayerModel = require("../models/player.js");

// router.get("/", authCtrl.getSignUp);

router.get("/new", async (req, res) => {
    let value5Players;
let value4Players;
let value3Players;
let value2Players;
let value1Players;

  try {
    value5Players= await PlayerModel.aggregate([
      { $match: { value: 5 } },
      { $sample: { size: 5 } },
    ]);
    value4Players= await PlayerModel.aggregate([
        { $match: { value: 4 } },
        { $sample: { size: 5 } },
      ]);
      value3Players= await PlayerModel.aggregate([
        { $match: { value: 3 } },
        { $sample: { size: 5 } },
      ]);
      value2Players= await PlayerModel.aggregate([
        { $match: { value: 2 } },
        { $sample: { size: 5 } },
      ]);
      value1Players= await PlayerModel.aggregate([
        { $match: { value: 1 } },
        { $sample: { size: 5 } },
      ]);

    
  } catch (err) {
    console.log(`Error randomizing players: ${err}`);
  }

      res.render('lineups/new.ejs', {
      value5Players,
      value4Players,
      value3Players,
      value2Players,
      value1Players
    });

});

// router.get("/:lineupId", authCtrl.getSignOut);

// router.post("/:lineupId/edit", authCtrl.postSignUp);

// router.post("/sign-in", authCtrl.postSignIn);

module.exports = router;
