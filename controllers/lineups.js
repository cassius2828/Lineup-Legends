const { formatDistanceToNow } = require("date-fns");
const PlayerModel = require("../models/player.js");
const LineupModel = require("../models/lineup.js");
const mongoose = require("mongoose");
const User = require("../models/user.js");

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
    // console.log(`Error randomizing players: ${err}`);
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
          {
            $match: {
              value: { $in: [playerToGambleValue, playerToGambleValue - 1] },
            },
          },
          { $sample: { size: 1 } },
        ]);
      } else {
        return await PlayerModel.aggregate([
          {
            $match: {
              value: {
                $in: [
                  playerToGamble + 1,
                  playerToGambleValue,
                  playerToGambleValue - 1,
                ],
              },
            },
          },
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
        // tracks how many times you gambled on your lineup
        lineup.timesGambled++;
        // console.log(
        //   `We replaced ${playerToGamble.firstName} with ${randomPlayer[0].firstName}`
        // );
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
      //   console.log("Lineup deleted successfully");
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
  const { ownerId } = req.params;
  let userLineups = await LineupModel.find({ owner: ownerId })
    .sort({ createdAt: -1 })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c")
    .populate("owner");

  // for each lineup, I will iterate over it and add my timestamp to the res.locals
  userLineups = await getRelativeTime(userLineups);

  res.render("lineups/index.ejs", { lineups: userLineups });
};

//////////////////////////////
//  Get Sort User Lineups
//////////////////////////////
const getSortUserLineups = async (req, res) => {
  const { sort } = req.query;
  const userId = req.session.user._id;
  try {
    let userLineups = await sortUserLineups(sort, userId);

    // for each lineup, I will iterate over it and add my timestamp to the res.locals
    userLineups = await getRelativeTime(userLineups);

    return res.render("lineups/index.ejs", { lineups: userLineups });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obtaining user lineups");
  }
};

//////////////////////////////
//  Get Sort Explore Lineups
//////////////////////////////
const getSortExploreLineups = async (req, res) => {
  const { sort } = req.query;
  try {
    let userLineups = await sortExploreLineups(sort);

    // for each lineup, I will iterate over it and add my timestamp to the res.locals
    userLineups = await getRelativeTime(userLineups);

    return res.render("lineups/explore.ejs", { lineups: userLineups });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obtaining explore lineups");
  }
};
//////////////////////////////
// * PUT reorder lineup
//////////////////////////////
const reorderLineup = async (req, res) => {
  const { pg, sg, sf, pf, c } = req.body;
  const { lineupId } = req.params;
  const ownerId = req.session.user._id;

  //   console.log(req.body);

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
    // console.log(reorderedLineup);
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
    .sort({ createdAt: -1 })
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c")
    .populate("owner");

  // for each lineup, I will iterate over it and add my timestamp to the res.locals
  allLineups = getRelativeTime(allLineups);
  // if(!allLineups[0].owner.username) {

  // }
  res.render("lineups/explore.ejs", { lineups: allLineups });
};
//////////////////////////////
// GET friends lineups
//////////////////////////////
const getFriendsLineups = async (req, res) => {
  try {
    // Step 1: Retrieve the current user and their friends
    const userId = req.session.user._id;
    const currentUser = await User.findById(userId).select("friends").lean();

    if (!currentUser) {
      return res.status(404).send("User not found");
    }
    // Step 2: Use aggregation to find all lineups from the user's friends
    let friendsLineups = await LineupModel.aggregate([
      {
        $match: {
          owner: {
            $in: currentUser.friends,
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    // Step 3: Populate the necessary fields
    friendsLineups = await LineupModel.populate(friendsLineups, [
      { path: "pg" },
      { path: "sg" },
      { path: "sf" },
      { path: "pf" },
      { path: "c" },
      { path: "owner" },
    ]);
    // Step 4: Add relative timestamps
    friendsLineups = getRelativeTime(friendsLineups);
    // Step 5: Render the result
    res.render("lineups/friends.ejs", { lineups: friendsLineups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot get friends lineup" });
  }
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
    .populate("c")
    .populate("owner");

  // allows me to use my fucntion to add the relative time to the locals obj
  let lineupArr = [];
  lineupArr.push(selectedLineup);
  lineupArr = await getRelativeTime(lineupArr);

  res.render("lineups/rate.ejs", { lineup: lineupArr[0] });
};

//////////////////////////////
// ? POST rate lineup
//////////////////////////////
const postRateLineup = async (req, res) => {
  const { lineupId } = req.params;
  const { value, userId } = req.body;
  try {
    //   find the lineup to rate by its id
    const lineupToRate = await LineupModel.findById(lineupId);

    //   check if we found a lineup to rate
    if (!lineupToRate) {
      res.status(404).send("Could not find lineup to rate");
    }
    //   check to see if this lineup has already been rated by the user
    const existingRating = lineupToRate.ratings.find(
      (rating) => rating.user.toString() === userId.toString()
    );
    // if a rating exists, then only update the value of the rating
    if (existingRating) {
      existingRating.value = value;
    } else {
      // otherwise create a new rating by pushing the user id for the user key and the value for the value key
      lineupToRate.ratings.push({
        user: { _id: userId },
        value,
      });
    }
    // save the rating
    await lineupToRate.save();

    // this returns the avgRating, which is now in our schema
    const avgRating = await updateAvgRating(lineupToRate);
    // update the avgRating
    await lineupToRate.updateOne({ avgRating });
    // save the average
    await lineupToRate.save();
  } catch (err) {
    console.error("Unable to rate the lineup: ", err);
    return res.status(500).send("Internal Server Error");
  }

  res.redirect("/lineups/explore");
};

//////////////////////////////
// ? POST upvote lineup
//////////////////////////////
const postUpvoteLineup = async (req, res) => {
  const { lineupId, pathExt } = req.params;

  const userId = req.session.user._id;
  const lineup = await LineupModel.findById(lineupId).populate("owner");

  if (lineup.owner._id === userId) {
    return res.status(400).send("A user cannot vote for their own lineup.");
  }
  try {
    await handleVotes(lineupId, userId, "upvote", "downvote");
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Unable to add upvote to the lineup`);
  }

  // ensures we redirect to the same page by looking at the end url
  // if it is not one of the two named paths, then it will default to the lineup
  // owner's prfile, this may change in the future
  if (pathExt === "friends") {
    res.redirect("/lineups/friends");
  } else if (pathExt === "explore") {
    res.redirect("/lineups/explore");
  } else {
    res.redirect(`/profiles/${lineup.owner._id}`);
  }
};

//////////////////////////////
// ? POST downvote lineup
//////////////////////////////
const postDownvoteLineup = async (req, res) => {
  const { lineupId, pathExt } = req.params;
  const userId = req.session.user._id;
  const lineup = await LineupModel.findById(lineupId).populate("owner");
  if (lineup.owner._id === userId) {
    return res.status(400).send("A user cannot vote for their own lineup.");
  }

  try {
    await handleVotes(lineupId, userId, "downvote", "upvote");
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Unable to add downvote to the lineup`);
  }
  // ensures we redirect to the same page by looking at the end url
  // if it is not one of the two named paths, then it will default to the lineup
  // owner's prfile, this may change in the future
  if (pathExt === "friends") {
    res.redirect("/lineups/friends");
  } else if (pathExt === "explore") {
    res.redirect("/lineups/explore");
  } else {
    res.redirect(`/profiles/${lineup.owner._id}`);
  }

  res.status(200);
};

//////////////////////////////
// ? POST upvote comments
//////////////////////////////
const postUpvoteComments = async (req, res) => {
  const { lineupId } = req.params;
  const userId = req.session.user._id;
  const { commentId } = req.body;

  try {
    await handleCommentVotes(lineupId, userId, commentId, "upvote", "downvote");
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Unable to add upvote to the comment`);
  }

  res.redirect(`/lineups/${lineupId}/comment`);
};

//////////////////////////////
// ? POST downvote comments
//////////////////////////////
const postDownvoteComments = async (req, res) => {
  const { lineupId } = req.params;
  const userId = req.session.user._id;
  const { commentId } = req.body;
  console.log(req.body, " <-- req.body");
  console.log(commentId, " <-- comment id");

  try {
    await handleCommentVotes(lineupId, userId, commentId, "downvote", "upvote");
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Unable to add downvote to the comment`);
  }

  res.redirect(`/lineups/${lineupId}/comment`);
};

//////////////////////////////
// ? POST upvote thread
//////////////////////////////
const postUpvoteThread = async (req, res) => {
  const { lineupId } = req.params;
  const userId = req.session.user._id;
  const { threadId, commentId } = req.body;

  try {
    await handleThreadVotes(
      lineupId,
      userId,
      commentId,
      threadId,
      "upvote",
      "downvote"
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).send(`Unable to add upvote to the comment`);
  }

  res.redirect(`/lineups/${lineupId}/comment`);
};

//////////////////////////////
// ? POST downvote thread
//////////////////////////////
const postDownvoteThread = async (req, res) => {
  const { lineupId } = req.params;
  const userId = req.session.user._id;
  const { threadId, commentId } = req.body;
  console.log(req.body, " <-- req.body");
  console.log(commentId, " <-- COMMENT id");
  console.log(threadId, " <-- THREAD id");

  try {
    await handleThreadVotes(
      lineupId,
      userId,
      commentId,
      threadId,
      "downvote",
      "upvote"
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).send(`Unable to add downvote to the comment`);
  }

  res.redirect(`/lineups/${lineupId}/comment`);
};
//////////////////////////////
// * PUT feature lineup
//////////////////////////////
const putFeatureLineup = async (req, res) => {
  try {
    const { lineupId } = req.params;
    const userId = req.session.user._id;

    const featuredUserLineups = await LineupModel.find({
      owner: userId,
      featured: true,
    });

    const lineupToFeature = await LineupModel.findById(lineupId);
    if (featuredUserLineups.length > 2 && lineupToFeature.featured === false) {
      return res
        .status(500)
        .send(
          "You are already at max capacity for featured lineups. Please remove some in order to add others."
        );
    }
    // toggle featured key value
    lineupToFeature.featured = !lineupToFeature.featured;
    // save the lineup
    await lineupToFeature.save();

    res.status(200).redirect(`/lineups/${userId}`);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).send(`Unable to toggle featured status of lineup`);
  }
};

//////////////////////////////
// GET  lineup comment
//////////////////////////////
const getLineupComment = async (req, res) => {
  const { lineupId } = req.params;
  const userId = req.session.user._id;
  const lineup = await LineupModel.findById(lineupId)
    .populate("pg")
    .populate("sg")
    .populate("sf")
    .populate("pf")
    .populate("c")
    .populate("owner")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "comments.thread",
      populate: {
        path: "user",
      },
    });
  // allows me to use my fucntion to add the relative time to the locals obj
  let lineupArr = [];
  lineupArr.push(lineup);
  lineupArr = await getRelativeTime(lineupArr);
  lineup.comments = await getRelativeTime(lineup.comments);
  for (let comment of lineup.comments) {
    comment = await getRelativeTime(comment.thread);
  }

  await lineup.save();
  //   console.log(lineup);
  res.render(`lineups/comment.ejs`, { lineup: lineupArr[0] });
};

//////////////////////////////
// ? POST  lineup comment
//////////////////////////////
const postLineupComment = async (req, res) => {
  const { lineupId } = req.params;
  const { text } = req.body;
  const userId = req.session.user._id;

  const lineup = await LineupModel.findById(lineupId);

  lineup.comments.push({
    user: {
      _id: userId,
    },
    text,
  });

  //   console.log(lineup.comments);

  await lineup.save();

  res.redirect(`/lineups/${lineupId}/comment`);
};
//////////////////////////////
// ? POST  thread new
//////////////////////////////
const postNewThread = async (req, res) => {
  const { lineupId } = req.params;
  const { text, commentId } = req.body;
  const userId = req.session.user._id;

  try {
    const lineup = await LineupModel.findById(lineupId)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .populate({
        path: "comments.thread",
        populate: {
          path: "user",
        },
      });

    // Ensure commentId is an ObjectId
    const mongooseCommentId = new mongoose.Types.ObjectId(commentId);

    const targetedComment = lineup.comments.find((comment) =>
      comment._id.equals(mongooseCommentId)
    );

    if (!targetedComment) {
      return res.status(404).send("Comment not found");
    }

    if (!targetedComment.thread) {
      targetedComment.thread = [];
    }

    targetedComment.thread.push({
      user: userId,
      text,
    });
    targetedComment.thread = await getRelativeTime(targetedComment.thread);

    await lineup.save();
    return res.redirect(`/lineups/${lineupId}/comment`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Could not add thread to comment");
  }
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
  getFriendsLineups,
  getRateLineup,
  postRateLineup,
  putFeatureLineup,
  postDownvoteLineup,
  postUpvoteLineup,
  getLineupComment,
  postLineupComment,
  postUpvoteComments,
  postDownvoteComments,
  // addPlayers,
  getRelativeTime,
  getSortUserLineups,
  getSortExploreLineups,
  postNewThread,
  postUpvoteThread,
  postDownvoteThread,
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
    // console.log("Lineup created successfully");
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

// updates the avg rating of lineups
async function updateAvgRating(lineup) {
  const numOfRatings = lineup.ratings.length;
  // if there are no ratings then return
  if (numOfRatings === 0) {
    return;
  } else {
    // otherwise calculate the average rating and return
    const sumOfRatings = lineup.ratings.reduce(
      (acc, val) => acc + val["value"],
      0
    );
    let avgRating = sumOfRatings / numOfRatings;
    return avgRating;
  }
}

// handles both upvotes and downvotes
async function handleVotes(
  lineupId,
  userId,
  targetVoteType,
  secondaryVoteType
) {
  const lineup = await LineupModel.findById(lineupId);

  if (!lineup) {
    return res.status(404).send("Could not find lineup to vote on");
  }
  // does a vote already exist for this user?
  const existingVote = lineup.votes.find(
    (vote) => vote.user.toString() === userId.toString()
  );

  if (existingVote) {
    if (existingVote[targetVoteType]) {
      // if there is already an existing vote with [targetVoteType] then delete it
      lineup.votes.remove(existingVote);
      // if there is an existing vote with downvote then change the values of each
    } else if (existingVote[secondaryVoteType]) {
      existingVote[targetVoteType] = true;
      existingVote[secondaryVoteType] = false;
    }
  } else {
    // if there is not existing vote then create an [targetVoteType]
    lineup.votes.push({
      user: { _id: userId },
      [targetVoteType]: true,
      [secondaryVoteType]: false,
    });
  }
  // save changes
  await lineup.save();
  lineup.totalVotes = await calculateTotalVotes(lineup);
  await lineup.save();
}
// handles both upvotes and downvotes || Comments (nested one layer)
async function handleCommentVotes(
  lineupId,
  userId,
  commentId,
  targetVoteType,
  secondaryVoteType
) {
  const lineup = await LineupModel.findById(lineupId);

  if (!lineup) {
    return res.status(404).send("Could not find lineup to vote on");
  }
  const targetedComment = lineup.comments.id(commentId);
  console.log(targetedComment, " <-- targeted comment");
  if (targetedComment.user.toString() === userId.toString()) {
    return res.status(403).send("User cannot vote for their own comment");
  }
  if (!targetedComment)
    return res.status(404).send("Could not find comment to vote on");

  // Find existing vote
  const existingVote = targetedComment.votes.find(
    (vote) => vote.user.toString() === userId.toString()
  );

  console.log(existingVote, " <-- existing vote");
  if (existingVote) {
    if (existingVote[targetVoteType]) {
      // if there is already an existing vote with [targetVoteType] then delete it
      targetedComment.votes.id(existingVote._id).remove();
      // if there is an existing vote with downvote then change the values of each
    } else if (existingVote[secondaryVoteType]) {
      existingVote[targetVoteType] = true;
      existingVote[secondaryVoteType] = false;
    }
  } else {
    // if there is not existing vote then create an [targetVoteType]
    targetedComment.votes.push({
      user: { _id: userId },
      [targetVoteType]: true,
      [secondaryVoteType]: false,
    });
  }
  // save changes
  await lineup.save();
  targetedComment.totalVotes = await calculateTotalVotes(targetedComment);
  await lineup.save();
}

// handles both upvotes and downvotes || Threads (nested two layers)
async function handleThreadVotes(
  lineupId,
  userId,
  commentId,
  threadId,
  targetVoteType,
  secondaryVoteType
) {
  const lineup = await LineupModel.findById(lineupId);

  if (!lineup) {
    return res.status(404).send("Could not find lineup to vote on");
  }
  // console.log(commentId, ' <-- comment Id')
  const targetedComment = lineup.comments.id(commentId);
  // console.log(targetedComment, " <-- targeted comment");
  const targetedThread = targetedComment.thread.id(threadId);
  // console.log(targetedThread, " <-- targeted thread");

  if (targetedThread.user.toString() === userId.toString()) {
    return res.status(403).send("User cannot vote for their own comment");
  }
  if (!targetedThread)
    return res.status(404).send("Could not find thread to vote on");

  // Find existing vote
  const existingVote = targetedThread.votes.find(
    (vote) => vote.user.toString() === userId.toString()
  );

  console.log(existingVote, " <-- existing vote");
  if (existingVote) {
    if (existingVote[targetVoteType]) {
      // if there is already an existing vote with [targetVoteType] then delete it
      targetedThread.votes.id(existingVote._id).remove();
      // if there is an existing vote with downvote then change the values of each
    } else if (existingVote[secondaryVoteType]) {
      existingVote[targetVoteType] = true;
      existingVote[secondaryVoteType] = false;
    }
  } else {
    // if there is not existing vote then create an [targetVoteType]
    targetedThread.votes.push({
      user: { _id: userId },
      [targetVoteType]: true,
      [secondaryVoteType]: false,
    });
  }
  // save changes
  await lineup.save();
  targetedThread.totalVotes = await calculateTotalVotes(targetedThread);
  await lineup.save();
}
//   calculate the total votes
async function calculateTotalVotes(lineup) {
  let upvotes = lineup.votes.filter((vote) => vote.upvote === true).length;
  let downvotes = lineup.votes.filter((vote) => vote.downvote === true).length;
  downvotes = downvotes * -1;
  return upvotes + downvotes;
}
// const players = require("../public/js/add-players.js");

// sort user lineups
async function sortUserLineups(sort, userId) {
  if (sort === "newest") {
    return await LineupModel.find({ owner: userId })
      .sort({ createdAt: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  } else if (sort === "oldest") {
    return await LineupModel.find({ owner: userId })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  } else if (sort === "highest-rated") {
    return await LineupModel.find({ owner: userId })
      .sort({ avgRating: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  } else if (sort === "lowest-rated") {
    return await LineupModel.find({ owner: userId })
      .sort({ avgRating: 1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  } else if (sort === "most-votes") {
    return await LineupModel.find({ owner: userId })
      .sort({ totalVotes: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  } else if (sort === "least-votes") {
    return await LineupModel.find({ owner: userId })
      .sort({ totalVotes: 1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c");
  }
}
// sort explore lineups
async function sortExploreLineups(sort) {
  if (sort === "newest") {
    return await LineupModel.find({})
      .sort({ createdAt: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  } else if (sort === "oldest") {
    return await LineupModel.find({})
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  } else if (sort === "highest-rated") {
    return await LineupModel.find({})
      .sort({ avgRating: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  } else if (sort === "lowest-rated") {
    return await LineupModel.find({})
      .sort({ avgRating: 1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  } else if (sort === "most-votes") {
    return await LineupModel.find({})
      .sort({ totalVotes: -1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  } else if (sort === "least-votes") {
    return await LineupModel.find({})
      .sort({ totalVotes: 1 })
      .populate("pg")
      .populate("sg")
      .populate("sf")
      .populate("pf")
      .populate("c")
      .populate("owner");
  }
}

// const players = require('../public/js/add-players.js')
// async function addPlayers() {

//   console.log('starting to add players')
//   try {
//     await PlayerModel.insertMany(players.players4);
//     console.log("Players added successfully");
//   } catch (error) {
//     console.error("Error adding players:", error);
//   }
// }
