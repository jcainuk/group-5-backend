const express = require("express");
const placeRouter = express.Router();

const {
  getPlaces,
  getPlaceById,
  createPlace,
  addGuessToPlace,
  getOrderedPlaces
} = require("../controllers/placesController");
const { deletePlaceById } = require("../controllers/placesController");

// Get all places
placeRouter.get("/", getPlaces);

//Get places in order of distance
placeRouter.get("/nearest", getOrderedPlaces);

// Get place by id
placeRouter.get("/:id", getPlaceById);

// Post place
placeRouter.post("/", createPlace);
placeRouter.delete("/:id", deletePlaceById);

// Add guess to place
placeRouter.post("/:id/guesses", addGuessToPlace);

module.exports = placeRouter;
