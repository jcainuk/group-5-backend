const User = require("../models/usersModel");
const mongoose = require("mongoose");

// get all workouts
// exports.getUsers = async (req, res) => {
//   const users = await User.find({}).sort({ createdAt: -1 });

//   res.status(200).json(users);
// };


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  }
  catch (err) {
    console.log(err)
  }
}
