const express = require("express");
const userRouter = express.Router();
const { getUsers, createUser } = require("../controllers/usersController");

// Get all users
userRouter.get("/", getUsers);

userRouter.post("/", createUser);

module.exports = userRouter;
