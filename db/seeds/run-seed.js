const seed = require("./seed.js");
const userData = require("../data/demo-data/users.js");
const placesData = require("../data/demo-data/places.js");
const { mongoose, startDbConnection } = require("../../connection");

startDbConnection()
  .then(() => {
    return seed({ userData, placesData });
  })
  .then(() => {
    mongoose.connection.close();
    console.log("attemtped close");
  });
