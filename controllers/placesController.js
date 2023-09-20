const Place = require("../models/placesModel");
const mongoose = require("mongoose");

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ createdAt: -1 });

    res.status(200).json(places);
  }
  catch (err) {
    console.log(err)
  }
}