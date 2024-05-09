const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "fahad123"

// Route 1: Create a user
router.post('/createuser', body('name', "Enter a valid name of length < 25.").isLength({ max: 25 }),
  body('email', "Please enter a valid email").isEmail(),
  body('password').isLength({ min: 5 }),

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });

    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ msg: 'The email address you have entered is already associated with another account.' });
      }
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

// Routhe 2: Authenticate a user at login
router.post('/login', body('name', "Enter a valid name of length > 3.").isLength({ max: 25 }),
  body('email', "Please enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists(),

  async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ errors: "The email or password is not correct." });
      }

      const passwordComapre = await bcrypt.compare(password, user.password);
      if (!passwordComapre) {
        success = false;
        return res.status(400).json({ errors: "The email or password is not correct." });
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ authtoken , success});

    } catch (error) {
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    };

  }
);

// Routh 3: Get signed in user details.
router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (errors) {
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }

);

module.exports = router;