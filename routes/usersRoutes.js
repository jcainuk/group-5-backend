const express = require("express");
const userRouter = express.Router();
const { getUsers } = require("../controllers/usersController");

// Get all users
userRouter.get("/", getUsers);

module.exports = userRouter;
