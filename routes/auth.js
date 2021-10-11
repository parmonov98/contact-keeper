const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const User = require("../models/User");

// @route POST /api/auth
// @description Get a logged in user
// @access public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Invalid credentials" });
  }
  // res.send("Logged in user");

});


// @route GET /api/auth
// @description Auth user & get token
// @access public
router.post("/", [
  check('email', "Please, Enter a valid email").isEmail(),
  check('password', "Password is required").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

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

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }

});



module.exports = router;