const { formatDistanceToNow } = require("date-fns");
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
    date: new Date(),
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
// * Get Gamble Player Page
//////////////////////////////
const getGamblePlayer = async (req, res) => {
  const lineup = await LineupModel.findById(req.params.lineupId);
  const playerToGamble = await PlayerModel.findById(
    req.params.playerId
  ).populate();
  //   console.log(playerToGamble);
  res.render("lineups/gamble.ejs", {
    player: playerToGamble,
    lineup,
  });
};
//////////////////////////////
// * PUT Gamble Lineup Page
//////////////////////////////
const putGamblePlayer = async (req, res) => {
  try {
    const lineup = await LineupModel.findById(req.params.lineupId);
    const playerToGamble = await PlayerModel.findById(req.params.playerId);
    const playerToGambleValue = playerToGamble.value;

    const randomPlayer = await PlayerModel.aggregate([
      {
        $match: {
          value: { $lte: playerToGambleValue + 1 },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    // list of keys to plug in as we iterate over the document
    const positions = ["pg", "sg", "sf", "pf", "c"];
    positions.forEach((position) => {
        // if the document key value matches the player to gamble now we know where to replace
      if (lineup[position].toString() === playerToGamble._id.toString()) {
        // replace with the value of the random player generated
        lineup[position] = randomPlayer[0]._id;
        lineup.save();
    
        console.log(
          `We replaced ${playerToGamble.firstName} with ${randomPlayer[0].firstName}`
        );
      }
    });

    return res.send("gambnle");
    res.render("lineups/gamble.ejs", {
      player: playerToGamble,
      randomPlayer,
      lineup,
    });
  } catch (err) {
    console.error(err); // Log the error to the console
    return res.status(500).send(err.message || "Internal Server Error");
  }
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

  // for each lineup, I will iterate over it and add my timestamp to the res.locals
  userLineups.forEach((lineup) => {
    if (lineup.createdAt) {
      // using the module to format the date from when it was created
      lineup.relativeTime = formatDistanceToNow(new Date(lineup.createdAt), {
        // adds the m/h/d/y
        addSuffix: true,
      });
    }
  });

  res.render("lineups/index.ejs", { lineups: userLineups });
};

module.exports = {
  getNewLineup,
  postNewLineup,
  getEditLineup,
  getGamblePlayer,
  deleteLineup,
  getUserLineups,
  putGamblePlayer,
};
