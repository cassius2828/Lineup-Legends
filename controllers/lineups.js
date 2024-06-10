const PlayerModel = require("../models/player.js");
const LineupModel = require("../models/lineup.js");

//////////////////////////////
// * Get New Lineup Page
//////////////////////////////
const getNewLineup = async (req, res) => {
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
};

//////////////////////////////
// * Post New Lineup
//////////////////////////////
const postNewLineup = async (req, res) => {
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
    date: new Date()
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
};

//////////////////////////////
// * Get Edit Lineup Page
//////////////////////////////
const getEditLineup = async (req, res) => {
  const selectedLineup = await LineupModel.findById(req.params.lineupId)
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  res.render("lineups/edit.ejs", { lineup: selectedLineup });
};

//////////////////////////////
// * Get Gamble Lineup Page
//////////////////////////////
const getGambleLineup = async (req, res) => {
  const lineup = await LineupModel.findById(req.params.lineupId);
  const playerToGamble = await PlayerModel.findById(req.params.playerId).populate();
  console.log(playerToGamble);
  res.render("lineups/gamble.ejs", {
    player: playerToGamble,
    lineup
  });
};

//////////////////////////////
// * Delete Lineup
//////////////////////////////
const deleteLineup = async (req, res) => {
  const ownerId = req.session.user._id;
  const lineupId = req.params.lineupId;
  try {
    const selectedLineup = await LineupModel.findById(lineupId);

    if (selectedLineup.owner.equals(ownerId)) {
      await LineupModel.findByIdAndDelete(lineupId);
      console.log("Lineup deleted successfully");
      res.redirect(`/lineups/${ownerId}`);
    } else {
      res.status(403).send("You do not have permission to delete this lineup.");
    }
  } catch (err) {
    console.error("Error deleting lineup:", err);
    res.status(500).send("Error occurred in the lineup deletion process");
  }
};

//////////////////////////////
// * Get User Lineups
//////////////////////////////
const getUserLineups = async (req, res) => {
  const userLineups = await LineupModel.find({ owner: req.session.user._id })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  console.log(userLineups);

  res.render("lineups/index.ejs", { lineups: userLineups });
};

module.exports = {
  getNewLineup,
  postNewLineup,
  getEditLineup,
  getGambleLineup,
  deleteLineup,
  getUserLineups,
};
