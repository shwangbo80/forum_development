const router = require("express").Router();
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const ObjectId = require("mongoose").Types.ObjectId;

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    if (!req.body.userId) {
      res.status(500).send("You must be registered user");
    } else if (!ObjectId.isValid(req.body.topicId)) {
      res.status(500).send("Invalid ID");
    } else {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments in post
router.get("/:id/comments", async (req, res) => {
  const postComment = await Comment.find({ postId: req.params.id });
  try {
    res.status(200).json(postComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (req.body.userId === post.userId || req.body.role === "admin") {
    const newPost = await Post.findByIdAndUpdate(req.params.id, {
      postName: req.body.postName,
      postBody: req.body.postBody,
      userId: req.body.userId,
      role: req.body.role,
    });
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).send("You must be registered user");
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!req.body.role === "admin") {
    res.status(500).json("Only the admin or post owner may delete this post");
  } else if (!req.body.userId === post.userId || null) {
    res.status(500).json("Only the admin or post owner may delete this post");
  } else {
    try {
      await post.deleteOne();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//delete all comments in post
router.delete("/:id/comments", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (!req.body.role === "admin" || !req.body.userId === post.userId) {
      res.status(500).json("Only the admin or post owner may delete this post");
    } else {
      try {
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json(topic);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
