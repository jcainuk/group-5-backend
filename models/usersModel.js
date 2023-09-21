const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    avatar_URL: {
      type: String
    },
    achievements: {
      gold: {
        type: Number,
        default: 0
      },
      silver: {
        type: Number,
        default: 0
      },
      bronze: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
