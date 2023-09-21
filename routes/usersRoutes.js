const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  createUser,
  getUserById
} = require("../controllers/usersController");

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

module.exports = userRouter;
