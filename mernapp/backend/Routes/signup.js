const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../Models/userSchema');
const { body, validationResult } = require('express-validator');


// Router to create user
router.post('/createuser', body('email').isEmail(),
body('name').isLength({min:3}),
body('password',"incorrect password").isLength({ min: 5 }),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name: req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location
        })
    res.json({success:true});
    }catch(error){
        console.log(error)
        res.send({success:false})

    }
});


module.exports=router;