require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//mongoose for schemas validation
const usersRoutes = require("./routes/usersRoutes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", usersRoutes);

const { MONGO_URI, DB, QUERIES } = process.env;

//DB specifies the database we're using from the cluster (set in run script)
const db = mongoose
  .connect(MONGO_URI + DB || "/test" + QUERIES)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { app, db };
