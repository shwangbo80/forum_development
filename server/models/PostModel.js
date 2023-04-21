const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    postName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
    },
    postBody: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
