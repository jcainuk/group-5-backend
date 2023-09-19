const User = require("../models/usersModel");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  }
  catch (err) {
    console.log(err)
  }
}
