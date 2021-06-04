const createError = require('http-errors');
const Order = require('../model/order');
const que = require('../que');

exports.PostOrder = async (req,res,next) => {
    console.log("post")
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