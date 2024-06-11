const { formatDistanceToNow } = require("date-fns");
const PlayerModel = require("../models/player.js");
const LineupModel = require("../models/lineup.js");

//////////////////////////////
//  Get New Lineup Page
//////////////////////////////
const getNewLineup = async (req, res) => {
  let value5Players, value4Players, value3Players, value2Players, value1Players;

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
// ? Post New Lineup
//////////////////////////////
const postNewLineup = async (req, res) => {
  createNewLineup(req, res);
};

////////////////////////////////////////////////////////////
// ? Post New Lineup | Redirect to Reorder Lineup
////////////////////////////////////////////////////////////
const postNewLineupRedirectToReorderLineup = async (req, res) => {
  createNewLineup(req, res, "reorder");
};

//////////////////////////////
//  Get Edit Lineup Page
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
//  Get Gamble Player Page
//////////////////////////////
const getGamblePlayer = async (req, res) => {
  const lineup = await LineupModel.findById(req.params.lineupId);
  const playerToGamble = await PlayerModel.findById(
    req.params.playerId
  ).populate();
  res.render("lineups/gamble.ejs", {
    player: playerToGamble,
    lineup,
    randomPlayer: null,
  });
};

//////////////////////////////
// * PUT Gamble Lineup Page
//////////////////////////////
const putGamblePlayer = async (req, res) => {
  try {
    // get lineup from params
    const lineup = await LineupModel.findById(req.params.lineupId);
    // select the player to gamble from params
    const playerToGamble = await PlayerModel.findById(req.params.playerId);
    // value of player to gamble
    const playerToGambleValue = playerToGamble.value;

    // list of keys to plug in as we iterate over the document
    const positions = ["pg", "sg", "sf", "pf", "c"];

    // function to determine what players are availble to be received from gamble
    async function determineValueOfPlayer() {
      if (playerToGambleValue === 1) {
        return await PlayerModel.aggregate([
          { $match: { value: { $eq: playerToGambleValue } } },
          { $sample: { size: 1 } },
        ]);
      } else if (playerToGambleValue === 5) {
        return await PlayerModel.aggregate([
          { $match: { value: { $lte: playerToGambleValue } } },
          { $sample: { size: 1 } },
        ]);
      } else {
        return await PlayerModel.aggregate([
          { $match: { value: { $lte: playerToGambleValue + 1 } } },
          { $sample: { size: 1 } },
        ]);
      }
    }

    // LET allows for recursion if the same player has been selected
    // it won't fully prevent it, but it drastically lowers the odds of it happening back to back
    let randomPlayer = await determineValueOfPlayer();

    // iterate over each position to find the position of the player we are gambling away
    for (const position of positions) {
      if (lineup[position].toString() === playerToGamble._id.toString()) {
        // replace with the value of the random player generated
        if (playerToGamble._id.toString() === randomPlayer[0]._id.toString()) {
          randomPlayer = await determineValueOfPlayer();
        }
        lineup[position] = randomPlayer[0]._id;
        // save changes of our document
        await lineup.save();

        console.log(
          `We replaced ${playerToGamble.firstName} with ${randomPlayer[0].firstName}`
        );
        break;
      }
    }

    res.render("lineups/gamble.ejs", {
      player: playerToGamble,
      randomPlayer: randomPlayer[0],
      lineup,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message || "Internal Server Error");
  }
};

//////////////////////////////
// ! Delete Lineup
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
//  Get User Lineups
//////////////////////////////
const getUserLineups = async (req, res) => {
  let userLineups = await LineupModel.find({ owner: req.session.user._id })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  // for each lineup, I will iterate over it and add my timestamp to the res.locals
  userLineups = getRelativeTime(userLineups);

  res.render("lineups/index.ejs", { lineups: userLineups });
};

//////////////////////////////
// * PUT reorder lineup
//////////////////////////////
const reorderLineup = async (req, res) => {
  const { pg, sg, sf, pf, c } = req.body;
  const { lineupId } = req.params;
  const ownerId = req.session.user._id;

  console.log(req.body);

  // Disallows duplicate players to be entered
  const compareArr = Object.values(req.body);
  const hasDuplicates = new Set(compareArr).size !== compareArr.length;
  if (hasDuplicates) {
    return res
      .status(400)
      .send("Duplicate players found. Lineup could not be updated");
  }

  compareArr.forEach((value) => {
    if (value === "") {
      return res
        .status(400)
        .send("Empty entries found in request. Lineup could not be updated.");
    }
  });

  try {
    const reorderedLineup = await LineupModel.findByIdAndUpdate(
      lineupId,
      { pg, sg, sf, pf, c },
      { new: true }
    );
    if (!reorderedLineup) {
      return res.status(404).send("Lineup not found");
    }
    console.log(reorderedLineup);
    res.redirect(`/lineups/${ownerId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error reordering lineup: ${error.message}`);
  }
};

//////////////////////////////
// GET explore lineups
//////////////////////////////
const getExploreLineups = async (req, res) => {
  let allLineups = await LineupModel.find({})
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");

  // for each lineup, I will iterate over it and add my timestamp to the res.locals
  allLineups = getRelativeTime(allLineups);

  res.render("lineups/explore.ejs", { lineups: allLineups });
};

//////////////////////////////
// GET rate lineup
//////////////////////////////
const getRateLineup = async (req, res) => {
  const selectedLineup = await LineupModel.findById(req.params.lineupId)
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c");
    
    // allows me to use my fucntion to add the relative time to the locals obj
  let lineupArr = [];
  lineupArr.push(selectedLineup);
  lineupArr = getRelativeTime(lineupArr);

  res.render("lineups/rate.ejs", { lineup: lineupArr[0] });
};

module.exports = {
  getNewLineup,
  postNewLineup,
  getEditLineup,
  getGamblePlayer,
  deleteLineup,
  getUserLineups,
  putGamblePlayer,
  postNewLineupRedirectToReorderLineup,
  reorderLineup,
  getExploreLineups,
  getRateLineup,
};

///////////////////////////
// FUNCTIONS
///////////////////////////

async function createNewLineup(req, res, decideRedirectPath) {
  let redirectPath;
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
    const selectedPlayers = await PlayerModel.find({ _id: { $in: playerIds } });
    const totalValue = selectedPlayers.reduce(
      (acc, player) => acc + player["value"],
      0
    );
    if (totalValue > 15) {
      return res
        .status(500)
        .send(
          "Lineup funds were overdrawn. Lineup could not be created. Please try again"
        );
    }

    const newLineup = await LineupModel.create(lineupData);
    console.log("Lineup created successfully");
    const newLineupId = newLineup._id;

    // conditionally redirect based on which btn was chosen for confirm lineup
    if (decideRedirectPath === "reorder") {
      redirectPath = `/lineups/${newLineupId}/edit`;
    } else {
      redirectPath = `/lineups/${req.session.user._id}`;
    }
    res.redirect(redirectPath);
  } catch (err) {
    console.error("Error creating lineup:", err);
    res.status(500).send("Error occurred in the lineup creation process");
  }
}

// gets relative time to display on UI
function getRelativeTime(arr) {
  arr.forEach((lineup) => {
    if (lineup.createdAt) {
      // using the module to format the date from when it was created
      lineup.relativeTime = formatDistanceToNow(new Date(lineup.createdAt), {
        // adds the m/h/d/y
        addSuffix: true,
      });
    }
    if (lineup.updatedAt) {
      lineup.updatedTime = formatDistanceToNow(new Date(lineup.updatedAt), {
        // adds the m/h/d/y
        addSuffix: true,
      });
    }
  });
  return arr;
}
