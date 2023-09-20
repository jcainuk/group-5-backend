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
    guesses: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Place", placeSchema);
