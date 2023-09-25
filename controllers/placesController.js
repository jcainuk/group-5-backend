const Place = require("../models/placesModel");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
const { updateUserAchievements, calculateDistance } = require("../utils/utils");

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ createdAt: -1 });

    res.status(200).json(places);
  } catch (err) {
    console.log(err);
  }
};

exports.getOrderedPlaces = async (req, res) => {
  const { query } = req;
  const { lat, lon } = query;
  try {
    const places = await Place.find({
      coordinates: { $near: [lat, lon] },
    }).limit(10);
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
      return res.status(404).json({ error: "Input invalid" });
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
};

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
};

// Controller function to add a new guess to the guesses array
exports.addGuessToPlace = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate placeId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid place ID" });
    }

    const { username, avatarURL, guessCoordinates } = req.body;
    const [latitude, longitude] = guessCoordinates;

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const [placeLat, placeLong] = place.coordinates;
    const distance = calculateDistance(
      placeLat,
      placeLong,
      latitude,
      longitude
    );

    let medal = null;

    if (distance < 25) {
      medal = "gold"; // Within 25 meters
    } else if (distance < 50) {
      medal = "silver"; // Within 50 meters
    } else if (distance < 75) {
      medal = "bronze"; // Within 75 meters
    }

    const newGuess = {
      username,
      avatarURL,
      distance,
      medal,
      guessCoordinates: [latitude, longitude],
    };

    place.guesses.push(newGuess);

    await place.save();

    const user = await User.findOne({ username });
    if (user) {
      updateUserAchievements(user, medal);
      await user.save();
    }

    res.status(200).json({ message: "Guess added successfully", place });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
