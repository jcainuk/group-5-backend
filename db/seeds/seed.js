const User = require("../../models/usersModel");

module.exports = async ({ userData, placeData }) => {
  await User.deleteMany({});
  await User.insertMany(userData);
};

// seed function for dev database
// start the test suite with test database
