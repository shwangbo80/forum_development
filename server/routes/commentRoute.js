const router = require("express").Router();
const Comment = require("../models/CommentModel");

// create comment
router.post("/", (req, res) => {});

// get all comments
router.get("/", (req, res) => {});

// get one comment
router.get("/:id", (req, res) => {});

// edit comment
router.put("/:id", (req, res) => {});

// delete comment
router.delete("/:id", (req, res) => {});

module.exports = router;
