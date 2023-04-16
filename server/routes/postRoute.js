const router = require("express").Router();
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  if (!req.body.userId) {
    res.status(500).send("You must be registered user");
  } else {
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
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
  const postComment = await Comment.find({postId: req.params.id});
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
  const newPost = await Post.findByIdAndUpdate(req.params.id, {
    postName: req.body.postName,
    postBody: req.body.postBody,
    userId: req.body.userId,
    role: req.body.role,
  });

  if (req.body.userId === post.userId || req.body.role === "admin") {
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id, {
    role: req.body.role,
  });
  if (req.body.role != "admin") {
    res.status(500).json("Only the admin may delete this post");
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
  if (req.body.role === "admin") {
    try {
      await Comment.deleteMany({postId: req.params.id});
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("Only the admin may delete this post");
  }
});

module.exports = router;
