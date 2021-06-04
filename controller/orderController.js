const createError = require('http-errors');
const Order = require('../model/order');


exports.PostOrder = async (req, res, next) => {
    console.log("post")
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
    console.log(req.id);
    const update = await Order.findOne({ _id: req.id });
    console.log(update);
    if (update) {
        update.status = req.status;
        update.save();
    }
}

exports.getTopFive = async (req,res,next) => {

}