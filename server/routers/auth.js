require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const resFailed = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// @Router api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  // Simple validation

  if (!userName || !password)
    return resFailed(res, 400, "Missing user name or password!");

  try {
    // Check existing user
    const user = await User.findOne({ userName });
    if (user) return resFailed(res, 400, "User already taken");

    // All Good
    const hasedPassword = await argon2.hash(password);
    const newUser = new User({ userName, password: hasedPassword });
    await newUser.save();

    // @return tocken
    const accessTocken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOCKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfuly!",
      accessTocken,
    });
  } catch (error) {
    resFailed(res, 500, "Internal Server Error!");
  }
});

// @Router api/auth/login
// @desc User Login
// @access Public
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  // Simple validation
  if (!userName || !password)
    return resFailed(res, 400, "Missing user name or password!");

  try {
    // Check existing user
    const user = await User.findOne({ userName });
    if (!user) return resFailed(res, 400, "User name or password  Incorrect");

    // Check Password existing user
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return resFailed(res, 400, "User name or password  Incorrect");

    // All Good
    // @return tocken
    const accessTocken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOCKEN_SECRET
    );
    res.json({
      success: true,
      message: "User Loged successfuly!",
      accessTocken,
    });
  } catch (error) {
    console.log(error);
    resFailed(res, 500, "Internal Server Error!");
  }
});

module.exports = router;
