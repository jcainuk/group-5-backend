const express = require("express");
const placeRouter = express.Router();
const { getPlaces, getPlaceById, createPlace} = require("../controllers/placesController");

// Get all places
placeRouter.get("/", getPlaces);

// Get place by id
placeRouter.get("/:id", getPlaceById)

// Post place
placeRouter.post("/", createPlace);

module.exports = placeRouter;
