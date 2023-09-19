require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI, DB, QUERIES } = process.env;

//DB specifies the database we're using from the cluster (set in run script)
mongoose
  .connect(MONGO_URI + DB || "/test" + QUERIES)
  .then(() => {
    // app.listen(process.env.PORT, () => {
      console.log("connected to db and listening");
    // });
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = mongoose