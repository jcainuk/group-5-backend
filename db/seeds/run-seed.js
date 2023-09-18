const seed = require("./seed.js");
const userData = require("../data/dev-data/users.js");
const { mongoose } = require("../../app.js");

// mongoose.connection.close();
seed({ userData }).then(() => {
  console.log("attemtped close");
});
