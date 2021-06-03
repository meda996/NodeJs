const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        default: ''
    },
    time:{
        type: Number,
        default: ''
    },
})

module.exports = mongoose.model('Ingredients', ingredientsSchema);