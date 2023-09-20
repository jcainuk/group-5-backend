const User = require("../models/usersModel");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// create new user
// create new workout
exports.createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Please fill in username field!" });
  }

  // add doc to db
  try {
    const user = await User.create({
      username
    });
    res.status(201).json({ msg: "user created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
