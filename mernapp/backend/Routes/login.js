const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/loginuser', async (req, res) => { 
    let email = req.body.email;
    let password = req.body.password;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Enter correct credentials!" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Enter correct credentials!" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const secretKey = process.env.SECRET_KEY;
      const authToken = jwt.sign(data, secretKey);
      return res.status(200).json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  });

module.exports = router;