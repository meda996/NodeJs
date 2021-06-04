const Order = require('../model/order');
const orderHistory = require('../model/orderHistory');


exports.PostOrder = async (req,res,next) => {
        const update = await orderHistory.findOne({order:req.id});
        if(update){
           update.status = req.status;
           update.save();
        }
}

    