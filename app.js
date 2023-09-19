const express = require("express");
const cors = require("cors");
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


module.exports = { app };
