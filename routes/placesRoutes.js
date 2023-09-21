const express = require("express");
const placeRouter = express.Router();

const {
  getPlaces,
  getPlaceById,
  createPlace,
  addGuessToPlace
} = require("../controllers/placesController");
const { deletePlaceById } = require("../controllers/placesController");

// Get all places
placeRouter.get("/", getPlaces);

// Get place by id
placeRouter.get("/:id", getPlaceById);

// Post place
placeRouter.post("/", createPlace);
placeRouter.delete("/:id", deletePlaceById);

// Add guess to place
placeRouter.post("/:id/guesses", addGuessToPlace);

module.exports = placeRouter;
