const express = require('express');
const router = express.Router();
const Food = require('../Models/foodSchema');


router.post("/addfood",async(req,res)=>{
    try{
        await Food.create({
            category: req.body.category,
            name:req.body.name,
            img:req.body.img,
            options:req.body.options,
            description:req.body.description
        })
        res.status(200).send("Data is saved!")
    } catch(error){
        res.status(400).send(error)
    }
});

module.exports=router;