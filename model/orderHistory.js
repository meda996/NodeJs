const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,     
    },
    status:{
        //0 for in progress
        //1 for fullfiled order 
        //2 for stopped order
        type: Number,
        default: 0,
    },
    timeLeft: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('orderHistory', orderHistorySchema);