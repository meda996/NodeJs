const createError = require('http-errors');
const Order = require('../model/order');

exports.PostOrder = async (req, res, next) => {
    try {
        const order = new Order({
            customer: req.body.customer,
            pizza: req.body.pizza,
        })

        await order.save();

        req.forQue = order;
        next();
        res.status(201).send({ order: order });
    } catch (e) {
        next(e);
    }
}

exports.PatchOrder = async (req, res, next) => {
    const update = await Order.findOne({ _id: req.id });
    if (update) {
        update.status = req.status;
        update.save();
    }
}

exports.getRecent = async (req,res,next) => {
    const recents = await Order.find();

}

exports.getStatus = async (req,res,next) => {
    try {
        const order = await Order.findOne({_id: req.params.orderId});
        if(!order){
            return next(createError(404,"Not an order!"))
        }
        const status = order.status === 0 ? "In progress" : "Finished";

        res.status(200).send({status});
    } catch (e) {
        next(e);
    }

}

exports.cancleOrder = async (req,res,next) => {
    try{
        const order = await Order.findOneAndDelete({_id: req.params.orderId});

        if(!order){
            return next(createError(404,"Not an order!"))
        }

        res.status(200).send({msg:"Order canceled"});
    }catch(e){
        next(e);
    }
}