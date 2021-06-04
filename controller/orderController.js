const createError = require('http-errors');
const Order = require('../model/order');
const OrderHistory = require('../model/orderHistory');


exports.PostOrder = async (req,res,next) => {
    console.log("post")
    try{
        const order = new Order({
            customer: req.body.customer,
            pizza: req.body.pizza,
        })

        await order.save();
        const forQue = {
            pizza: req.body.pizza,
            orderId: order._id,
        }
        
        const orderHistory = new OrderHistory({
            order: order._id,
        })

        await orderHistory.save();

        req.forQue = forQue;
        next();
        res.status(201).send({order:order});
    }catch(e){
        next(e);
    }
}