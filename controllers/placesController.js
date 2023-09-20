const Place = require("../models/placesModel");
const mongoose = require("mongoose");

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ createdAt: -1 });

    res.status(200).json(places);
  } catch (err) {
    console.log(err);
  }
};

exports.getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid id" });
    }

    const place = await Place.findById(id);
    if (!place) {

      return res.status(404).json({ error: "No place found" });
    }
    res.status(200).json(place);

  } catch (err) {
    console.log(err);
  }
};
