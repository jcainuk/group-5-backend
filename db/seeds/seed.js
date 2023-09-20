const User = require("../../models/usersModel");
const Place = require("../../models/placesModel")

module.exports = async ({ userData, placesData }) => {

  await User.deleteMany({});
  await User.insertMany(userData);
  await Place.deleteMany({});
  await Place.insertMany(placesData);
};

// seed function for dev database
// start the test suite with test database

