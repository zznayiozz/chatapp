require("dotenv").config();
const express = require("express");
const router = express.Router();
const PostEvent = require("../models/PostEvent");
const verifyToken = require("../middleware/verifyToken");

// @Router api/postevent
// @desc User post message
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res
      .status(401)
      .json({ success: false, message: "Please input Title" });

  try {
    const newPost = new PostEvent({
      message,
      userId: req.userId,
    });
    await newPost.save();

    res.json({
      success: true,
      message: "User created successfuly!",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
