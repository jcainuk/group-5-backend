const mongoose = require("mongoose");

const noSpacesValidator = function (value, field) {
  if (/\s/.test(value)) {
    let fieldName = field === "username" ? "Username" : "Avatar_url";
    throw new Error(`${fieldName} cannot contain spaces.`);
  }
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: (value) => noSpacesValidator(value, "username"),
        message: "Username cannot contain spaces."
      }
    },
    avatar_URL: {
      type: String,
      validate: {
        validator: (value) => noSpacesValidator(value, "avatar_URL"),
        message: "Avatar_url cannot contain spaces."
      }
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
