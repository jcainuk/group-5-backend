const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new mongoose.Schema(
  {
    placeName: {
      type: String,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (array) {
          return array.length === 2;
        },
      },
    },
    creator: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    guesses: [
      {
        user_id: String,
        username: String,
        avatarURL: String,
        distance: Number,
        medal: String,
      },
    ],
    votes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//if changing schema, need to update places controllers req.body destructuring
module.exports = mongoose.model("Place", placeSchema);
