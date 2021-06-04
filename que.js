
const que = [];
const OrderHistory = require('./controller/orderHistoryController');

exports.queLength = async (req, res, next) => {
    console.log("in que")
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
    const test = setTimeout(function () {
        console.log("Pizza delivery!");
        order = {
            id: que[0].orderId,
            status: 1
        };
        OrderHistory.PostOrder(order);
        que.splice(0, 1);
        if (que.length < 1) {
            clearInterval(test);
        } else {
            pizza = que[0].pizza;
            chef();
        }
    }, pizza.time);
}

exports.onShutDown = async (req,res,next) => {
    
}
