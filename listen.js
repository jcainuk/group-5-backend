require("dotenv").config();
const { app } = require("./app");
const { PORT } = process.env;
const { mongoose, startServer } = require("./connection");

startServer().then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
});
