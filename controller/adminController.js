const createError = require('http-errors');
const Order = require('../model/order');
const Admin = require('../model/admin');
const Ingredients = require('../model/ingredients');


exports.login = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email, password: req.body.password});
        
        admin.password = undefined;

        res.status(200).send({ admin,msg: "Successful" });
    } catch (e) {
        next(e);
    }
}

exports.getInfo = async (req,res,next) => {
    let ing = [];
    let totalEarned = 0;

    const orders = await Order.find();

    if (orders.length === 0) {
        res.status(200).send({ msg: "Successful, no data in DB" });
    }

    orders.forEach(order => {
        totalEarned = totalEarned + order.pizza.price;
        order.pizza.ingredients.map(ingredient => {
            if(ing.length === 0){
                ing.push(ingredient);
            }else{
                let checker = 0;
                let checker2 = false;
                ing.map(i => {
                    checker ++ ;
                    if(i._id.equals(ingredient.name._id)){
                        i.quantity += ingredient.quantity;
                        
                    }
                    if(ing.length === checker){
                        ing.push(i);
                    }
                })
            }
        })
    })


    const orderHistory = orders;


    res.status(200).send({orderHistory,totalEarned });
}