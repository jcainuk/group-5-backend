const express = require("express");
const placeRouter = express.Router();
const { getPlaces } = require("../controllers/placesController");

// Get all users
placeRouter.get("/", getPlaces);

module.exports = placeRouter;
