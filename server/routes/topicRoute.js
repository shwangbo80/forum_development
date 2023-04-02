const router = require("express").Router();
const Topic = require("../models/TopicModel");
const Post = require("../models/PostModel");

// create topic
router.post("/", async (req, res) => {
  const newTopic = new Topic(req.body);
  if (req.body.role != "admin") {
    res.status(500).send("You must be admin to create topics");
  } else {
    try {
      const savedTopic = await newTopic.save();
      res.status(200).json(savedTopic);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// get all topics
router.get("/", async (req, res) => {
  const topics = await Topic.find();
  try {
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts in topics
router.get("/:id/posts", async (req, res) => {
  const topicPosts = await Post.find({ topicId: req.params.id });
  try {
    res.status(200).json(topicPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one topic
router.get("/:id", async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  try {
    res.status(200).json(topic);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit topic
router.put("/:id", async (req, res) => {
  const topic = await Topic.findByIdAndUpdate(req.params.id, {
    categoryId: req.body.categoryId,
    topicName: req.body.topicName,
    topicDescription: req.body.topicDescription,
  });

  if (req.body.role != "admin") {
    res.status.send("You are must be admin to edit topics");
  } else {
    try {
      await topic.save();
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// delete topic
router.delete("/:id", async (req, res) => {
  if (req.body.role === "admin") {
    const topic = await Topic.findById(req.params.id);
    try {
      await topic.deleteOne();
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("Only the admin may delete this post");
  }
});

//delete all posts in topic
router.delete("/:id/topics", async (req, res) => {
  if (req.body.role === "admin") {
    try {
      await Post.deleteMany({ topicId: req.params.id });
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("Only the admin may delete this post");
  }
});

module.exports = router;
