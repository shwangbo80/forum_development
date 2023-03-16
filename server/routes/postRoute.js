const router = require("express").Router();
const Post = require("../models/PostModel");

// create post
router.post("/", (req, res) => {});

// get all posts
router.get("/", (req, res) => {});

// get one post
router.get("/:id", (req, res) => {});

// edit post
router.put("/:id", (req, res) => {});

// delete post
router.delete("/:id", (req, res) => {});

module.exports = router;
