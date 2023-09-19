const seed = require("./seed.js");
const userData = require("../data/dev-data/users.js");
const { mongoose, startDbConnection } = require("../../connection");

startDbConnection()
  .then(() => {
    console.log({ userData });
    return seed({ userData });
  })
  .then(() => {
    mongoose.connection.close();
    console.log("attemtped close");
  });

// seed({ userData }).then(() => {
//   mongoose.connection.close();
//   console.log("attemtped close")

// });
