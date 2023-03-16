const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postCategory: {
    type: String,
    required: true,
  },
  postName: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  postBody: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PostInfo", PostSchema);
