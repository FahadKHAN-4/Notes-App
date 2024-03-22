const express = require('express'); 
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "fahad123"


router.post('/createuser', body('email').isEmail(),
    body('name', "Enter a valid name of length > 3.").isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),

    async (req, res)=>{ 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        try {
            // Create the user using await to wait for the Promise to resolve
            const user = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: secPass,
            });

            const data = {
                user:{
                  id: user.id
                }
            }

            const authtoken = jwt.sign(data,JWT_SECRET);
            res.json({authtoken});
          } catch (err) {
            if (err.code === 11000) {
              return res.status(400).json({msg:'The email address you have entered is already associated with another account.' });
            }
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }

        // User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        // }).then(user => res.json(user)).catch(err => {
        //     if (err.code === 11000) {
        //       return res.status(400).json({ errors: [{ msg: 'The email address you have entered is already associated with another account.' }] });
        //     }
        //     res.status(500).json({ errors: [{ msg: 'Server error' }] });
        //   });
        

}); 

module.exports = router;