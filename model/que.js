const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queSchema = new Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
})

module.exports = mongoose.model('Que', queSchema);