const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById
} = require("../controllers/usersController");

userRouter.get("/", getUsers);
userRouter.post("/", createUser);

userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.patch("/:id", updateUserById);

module.exports = userRouter;
