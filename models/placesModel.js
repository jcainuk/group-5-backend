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
        guessCoordinates: {
          type: [Number],
          validate: {
            validator: function (array) {
              return array.length === 2;
            },
          },
          default: null,
        },
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

// Create an index with the expireAfterSeconds option
placeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 16384 });

// create 2d index to enable geospatial queries
placeSchema.index( {coordinates: "2d" } )

module.exports = mongoose.model("Place", placeSchema);
