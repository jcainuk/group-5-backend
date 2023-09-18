const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    coordinates: {
      type: [Number],
      required: true
    },
    author: {
      type: String,
      required: true
    },
    rating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Place", placesSchema);
