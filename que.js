
const que = [];
const OrderModel = require('./model/order');
const OrderController = require('./controller/orderController');
let chefStartTime = 0;

const fs = require('fs');


exports.fillQue = async (timeLeft) => {
    const reformQue = await OrderModel.find({ status: 0 });
    reformQue.map(element => {
        if (reformQue.length > 0) {
            que.push(element);
        }
    })
    if (reformQue.length > 0) {
        que[0].pizza.time = que[0].pizza.time - timeLeft;
    }
    if (que.length > 0) {
        chef();
    }

}


exports.queLength = async (req, res, next) => {
    if (que.length + 1 > 3) {
        return res.status(200).send("Too many orders please try agian in few minutes!");
    }
    else {
        next();
    }
}

exports.putInQue = async (req, res, next) => {
    que.push(req.forQue);
    if (que.length === 1 || que.length === 0) {
        chef();
    }
}

function chef() {
    let pizza = que[0].pizza;
    chefStartTime = Date.now();
    const test = setTimeout(function () {
        console.log("Pizza delivery!");
        chefStartTime = new Date();
        console.log(que[0]);
        order = {
            id: que[0]._id,
            status: 1
        };
        OrderController.PatchOrder(order);
        que.splice(0, 1);
        if (que.length < 1) {
            clearInterval(test);
        } else {
            pizza = que[0].pizza;
            chef();
        }
    }, pizza.time);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    const time = Date.now() - chefStartTime;
    let data = JSON.stringify({ timeLeft: time });
    fs.writeFileSync('que.json', data);
}
