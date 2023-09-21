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

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid id" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(user);
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
    res.status(statusCode).json({ msg: "username required" });
  }
};

// delete user by id
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// update user by id
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { achievements, ...restOfUpdates } = req.body;

    if (achievements) {
      user.achievements.gold += achievements.gold || 0;
      user.achievements.silver += achievements.silver || 0;
      user.achievements.bronze += achievements.bronze || 0;
    }

    for (const key in restOfUpdates) {
      if (restOfUpdates.hasOwnProperty(key)) {
        user[key] = restOfUpdates[key];
      }
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
