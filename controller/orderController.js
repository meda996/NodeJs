const createError = require('http-errors');
const Order = require('../model/order');

exports.PostOrder = async (req,res,next) => {
    try{


        const order = new Order({
            customer: req.body.customer,
            pizza: req.body.pizza,
        })

        await order.save();

        res.status(201).send("Order Created");
    }catch(e){
        next(e);
    }
}