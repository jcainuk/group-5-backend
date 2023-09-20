require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI, DB, QUERIES } = process.env;

//DB specifies the database we're using from the cluster (set in run script)

const database = DB || "/test";

const startDbConnection = () => {
  console.log(MONGO_URI + database + QUERIES);
  return mongoose
    .connect(MONGO_URI + database + QUERIES)
    .then(() => {
      console.log("connected to db and listening");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { mongoose, startDbConnection };
