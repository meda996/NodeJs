const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    status:{
            //0 for in progress
            //1 for fullfiled order 
            type: Number,
            default: 0,
    },
    orderTime: {
        type: Date,
        default: Date.now()
    },
    customer: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },
    pizza: {
        size: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: [{
            name: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredients',
                required: true
            },
            quantity: {
                type: Number,
                default: 0,
            }
        }],
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Order', orderSchema);