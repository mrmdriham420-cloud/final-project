const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.json({
      message: "User already exists"
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json({
    message: "Registration Successful"
  });
});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "Invalid Email"
    });
  }

  const match =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!match) {
    return res.json({
      message: "Wrong Password"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    message: "Login Successful"
  });
});

module.exports = router;