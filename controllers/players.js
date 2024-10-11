const PlayerModel = require("../models/player");

///////////////////////////
// GET | Search Players Index
///////////////////////////
const getSearchPlayers = async (req, res) => {
  try {
    players = await PlayerModel.aggregate([
      { $sort: { value: -1 } },
      { $limit: 10 },
    ]);

    let message = false;

    res.render("players/index.ejs", { players, message });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Unable to get players`);
  }
};
///////////////////////////
// ? POST | Search Players Index
///////////////////////////
const postSearchPlayers = async (req, res) => {
  const { query } = req.body;
  try {
    if (query && query.length > 0) {
      players = await PlayerModel.aggregate([
        {
          $match: {
            $or: [
              { firstName: { $regex: query, $options: "i" } }, // Case-insensitive search for firstName
              { lastName: { $regex: query, $options: "i" } }, // Case-insensitive search for lastName
            ],
          },
        },
      ]);
    } else {
      players = await PlayerModel.aggregate([
        { $sort: { value: -1 } },
        { $limit: 10 },
      ]);
    }
    let message = false;

    console.log("Found players:", players); // Log found players
    res.status(200).json({ ok: true, players });
  } catch (err) {
    console.error("Error in postSearchPlayers:", err); // Log error details
    res
      .status(500)
      .json({ ok: false, message: "Unable to search and filter players" });
  }
};

//////////////////////////////
//  Get Sort User Lineups
//////////////////////////////
const getSortPlayers = async (req, res) => {
  const { sort } = req.query;
  let filteredPlayers = await sortUserLineups(sort);
  console.log(filteredPlayers);
  try {
    res.status(200).render("players/index.ejs", { players: filteredPlayers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obtaining user lineups");
  }
};

module.exports = {
  getSearchPlayers,
  postSearchPlayers,
  getSortPlayers,
};

///////////////////////////
// FUNCTIONS
///////////////////////////

// sort players
async function sortUserLineups(sort) {
  if (sort === "5") {
    return await PlayerModel.find({ value: 5 });
  } else if (sort === "4") {
    return await PlayerModel.find({ value: 4 });
  } else if (sort === "3") {
    return await PlayerModel.find({ value: 3 });
  } else if (sort === "2") {
    return await PlayerModel.find({ value: 2 });
  } else if (sort === "1") {
    return await PlayerModel.find({ value: 1 });
  } else {
    return await PlayerModel.aggregate([
      { $sort: { value: -1 } },
      { $limit: 10 },
    ]);
  }
}
