const seed = require("./seed.js");
const userData = require("../data/dev-data/users.js");
const mongoose = require("../../connection");


seed({ userData }).then(() => {
  mongoose.connection.close();
  console.log("attemtped close")
  
});