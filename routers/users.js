const express = require("express");

const router = express.Router();

const User = require("../models/User");
var bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const users = await User.find();

  if (!users) {
    return res.status(500).json({ success: false });
  } else {
    return res.status(200).json(users);
  }
});

router.post("/", async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  newUser = await newUser.save();

  if (!newUser) {
    return res.status(400).json("User cannot be created");
  }

  return res.status(200).json(newUser);
});

module.exports = router;
