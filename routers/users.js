const express = require("express");

const router = express.Router();

const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const users = await User.find().select("-passwordHash");

  if (!users) {
    return res.status(500).json({ success: false });
  } else {
    return res.status(200).json(users);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    return res.status(500).json({ success: false });
  } else {
    return res.status(200).json(user);
  }
});

//register
router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    var token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.secret,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(400).send("Password is wrong");
  }
});

module.exports = router;
