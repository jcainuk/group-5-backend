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


//will need UPDATING if schema changes
exports.createPlace = async (req, res) => {
  try {
    const placeData = req.body;

    const newPlace = new Place(placeData);

    const valid = newPlace.validateSync();
    if (valid) {
      return res
          .status(404)
          .json({ error: "Input invalid" });
    } else {
      if (
        !placeData.placeName ||
        !placeData.coordinates ||
        !placeData.creator ||
        !placeData.imgURL
      ) {
        return res
          .status(404)
          .json({ error: "Please enter all required fields" });
      }

      const place = await Place.create(placeData);
      res.status(201).json(place);
    }
  } catch (err) {
    // console.log(err._message);
    res.status(500).json({ err: "could not create place" });
  }
}

exports.deletePlaceById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such place" });
  }

  const place = await Place.deleteOne({ _id: id });

  if (!place) {
    return res.status(404).json({ error: "No such place" });
  }

  res.status(200).json({ place });
}
