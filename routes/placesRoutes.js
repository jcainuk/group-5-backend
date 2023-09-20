const express = require("express");
const placeRouter = express.Router();

const { getPlaces, getPlaceById, createPlace} = require("../controllers/placesController");
const {deletePlaceById} = require("../controllers/placesController")


// Get all places
placeRouter.get("/", getPlaces);

// Get place by id
placeRouter.get("/:id", getPlaceById)


// Post place
placeRouter.post("/", createPlace);
placeRouter.delete("/:id", deletePlaceById)


module.exports = placeRouter;
