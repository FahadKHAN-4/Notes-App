const express = require('express'); 
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/', body('email').isEmail(),
    body('name', "Enter a valid name of length > 5.").isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    (req, res)=>{ 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).catch(err => {
            if (err.code === 11000) {
              return res.status(400).json({ errors: [{ msg: 'The email address you have entered is already associated with another account.' }] });
            }
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
          });
        

}); 

module.exports = router;