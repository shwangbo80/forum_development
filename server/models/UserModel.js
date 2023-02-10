const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  authid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: true,
  },
  userabout: {
    type: String,
    required: false,
    min: 1,
    max: 200,
  },
  usersignature: {
    type: String,
    required: false,
    min: 1,
    max: 200,
  },
});

module.exports = mongoose.model("UserInfo", UserSchema);
