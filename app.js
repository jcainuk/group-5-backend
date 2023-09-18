require("dotenv").config();
const express = require("express");
const cors = require("cors");
//mongoose for schemas validation
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
