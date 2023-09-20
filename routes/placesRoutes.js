const express = require("express");
const placeRouter = express.Router();
const { getPlaces, getPlaceById } = require("../controllers/placesController");

// Get all users
placeRouter.get("/", getPlaces);

placeRouter.get("/:id", getPlaceById)

module.exports = placeRouter;
