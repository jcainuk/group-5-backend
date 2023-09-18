const User = require("../models/usersModel");
const mongoose = require("mongoose");

// get all workouts
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

module.exports = { getUsers };
