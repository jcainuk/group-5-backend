const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  createUser,
  getUserById,
  deleteUserById
} = require("../controllers/usersController");

userRouter.get("/", getUsers);
userRouter.post("/", createUser);

userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
