const express = require('express');
const router = express.Router();
const FoodCateory = require('../Models/foodCategory');


router.post("/foodcategory",async(req,res)=>{
    try{
        await FoodCateory.create({
            categoryName: req.body.categoryName
        })
        res.status(200).send("Data is saved!")
    } catch(error){
        res.status(400).send(error)
    }
});

module.exports=router;