const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  value: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
});

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvote: {
    type: Boolean,
    default: false,
  },
  downvote: {
    type: Boolean,
    default: false,
  },
});

const lineupSchema = new mongoose.Schema(
  {
    pg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    sg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    sf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    pf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    c: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    featured: {
      type: Boolean,
    },
    comments: [commentSchema],
    ratings: [ratingSchema],
    avgRating: {
      type: Number,
      default: 0,
    },
    votes: [voteSchema],
    totalVotes: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  //   this automatically creates keys createdAt and updatedAt in my document
  { timestamps: true }
);

const LineupModel = mongoose.model("Lineup", lineupSchema);

module.exports = LineupModel;

/*
RATINGS:
look into virtual fields for mongoose schemas so you can 
automatically convert the average for the ratings

I am thinking I could use an aggregate pipeline and do something like this
I will need to look up how to do this properly, but this is my general idea

LineupModel.aggregation([
{
//* choose the key I am manipulating
$project: {
rating: 1,
* get the total ammount of all ratings
totalAmount: {$sum: [rating]},
* get average of the ratings by dividing the total amount by the num of ratings listed in array
avgRating: {$divide: [$sum, $numOfRatings]}

}
}
])


*/

  