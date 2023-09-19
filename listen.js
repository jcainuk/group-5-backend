require("dotenv").config();
const { app } = require("./app");
const { PORT } = process.env;
const { mongoose, startDbConnection } = require("./connection");

startDbConnection().then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
});
