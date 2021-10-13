const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
// @route POST /api/users
// @description Register a user
// @access public

router.post("/", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please, enter a valid email").isEmail(),
  check("password", "Please, enter a password with 6 or more chars").isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ msg: "User already in DB" });
    }

    user = new User({
      name, email, password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    // res.json(user);
    jwt.sign(payload, config.get("JWT_SECRET"), {
      expiresIn: 360000,

    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    // res.json(payload);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

  // console.log(user);
  // res.send(req.body);
});

module.exports = router;