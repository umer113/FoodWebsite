const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    categoryName:{
        type:String
    },
    name:{
        type:String
    },
    img:{
        type:String
    },
    options:{
        type:Array
    },
    description:{
        type:String
    }
});

module.exports = mongoose.model('food',foodSchema);