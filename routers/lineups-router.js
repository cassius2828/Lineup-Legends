const express = require("express");
const router = express.Router();
const lineupCtrl = require("../controllers/lineups.js");
const PlayerModel = require("../models/player.js");
const LineupModel = require("../models/lineup.js");

//////////////////////////////
// GET /new - Create New Lineup Page
//////////////////////////////
router.get("/new", async (req, res) => {
  let value5Players;
  let value4Players;
  let value3Players;
  let value2Players;
  let value1Players;

  try {
    value5Players = await PlayerModel.aggregate([
      { $match: { value: 5 } },
      { $sample: { size: 5 } },
    ]);
    value4Players = await PlayerModel.aggregate([
      { $match: { value: 4 } },
      { $sample: { size: 5 } },
    ]);
    value3Players = await PlayerModel.aggregate([
      { $match: { value: 3 } },
      { $sample: { size: 5 } },
    ]);
    value2Players = await PlayerModel.aggregate([
      { $match: { value: 2 } },
      { $sample: { size: 5 } },
    ]);
    value1Players = await PlayerModel.aggregate([
      { $match: { value: 1 } },
      { $sample: { size: 5 } },
    ]);
  } catch (err) {
    console.log(`Error randomizing players: ${err}`);
  }

  res.render("lineups/new.ejs", {
    value5Players,
    value4Players,
    value3Players,
    value2Players,
    value1Players,
  });
});

//////////////////////////////
// POST /new - Create New Lineup
//////////////////////////////
router.post("/new", async (req, res) => {
  const playerIds = req.body["playerIds[]"] || [];
  const [pg, sg, sf, pf, c] = playerIds;

  const lineupData = {
    pg,
    sg,
    sf,
    pf,
    c,
    featured: false,
    owner: req.session.user?._id,
  };

  try {
    // Checks to ensure lineup is within the $15 value range
    const selectedPlayers = await PlayerModel.find({
      _id: { $in: playerIds },
    });
    const totalValue = selectedPlayers.reduce(
      (acc, player) => acc + player["value"],
      0
    );
    if (totalValue > 15)
      return res
        .status(500)
        .send(
          "Lineup funds were overdrawn. Lineup could not be created. Please try again"
        );

    await LineupModel.create(lineupData);
    console.log("Lineup created successfully");
    res.redirect(`${req.session.user._id}`);
  } catch (err) {
    console.error("Error creating lineup:", err);
    res.status(500).send("Error occurred in the lineup creation process");
  }
});

//////////////////////////////
// GET /:lineupId/edit - Edit Lineup
//////////////////////////////
router.get("/:lineupId/edit", async (req, res) => {
  const selectedLineup = await LineupModel.findById(req.params.lineupId)
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  res.render("lineups/edit.ejs", { lineup: selectedLineup });
});

//////////////////////////////
// GET /:lineupId/gamble - gamble Lineup
//////////////////////////////
router.get("/:lineupId/gamble/:playerId", async (req, res) => {
    const playerToGamble = await LineupModel.findById(req.params.playerId)
      .populate()
  console.log(playerToGamble)
    res.render("lineups/gamble.ejs", { player: playerToGamble, lineup: req.params.lineupId });
  });
//////////////////////////////
// DELETE /:lineupId/edit - delete Lineup
//////////////////////////////
router.delete("/:lineupId/edit", async (req, res) => {
    const ownerId = req.session.user._id;
    const lineupId = req.params.lineupId
    try {
      const selectedLineup = await LineupModel.findById(lineupId);
      
      if (selectedLineup.owner.equals(ownerId)) {
        await LineupModel.findByIdAndDelete(lineupId)
        console.log("Lineup deleted successfully");
        res.redirect(`/lineups/${ownerId}`);
      } else {
        res.status(403).send("You do not have permission to delete this lineup.");
      }
    } catch (err) {
      console.error("Error deleting lineup:", err);
      res.status(500).send("Error occurred in the lineup deletion process");
    }
  });
//////////////////////////////
// GET /:ownerId - View User Lineups
//////////////////////////////
router.get("/:ownerId", async (req, res) => {
  const userLineups = await LineupModel.find({ owner: req.session.user._id })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  console.log(userLineups);

  res.render("lineups/index.ejs", { lineups: userLineups });
});
module.exports = router;
