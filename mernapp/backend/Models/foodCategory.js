const mongoose = require('mongoose');

const foodCategory = mongoose.Schema({
    categoryName:{
        type:String
}
});

module.exports = mongoose.model('foodCategory',foodCategory);