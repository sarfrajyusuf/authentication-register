const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: Number, enum: [0, 1], default: 1 }, //o: admin/ 1: user
    isAdmin: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true },
    token: { type: String, default: null },
  },
  {
    timestamp: true,
  }
);
module.exports = new mongoose.model("user", userSchema);
