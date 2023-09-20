const User = require("../models/usersModel");
const mongoose = require("mongoose");

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// create new user
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    const savedUser = await user.save();

    res.status(201).json({ msg: "User created successfully", user: savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    const statusCode = err.name === "ValidationError" ? 422 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};
