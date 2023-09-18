const express = require("express");
const userRouter = express.Router();

// Get all users
userRouter.get("/", getUsers);

module.exports = userRouter;
