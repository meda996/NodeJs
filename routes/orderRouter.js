const express = require('express');
const que = require('../que');

const router = express.Router();

const orderController = require('../controller/orderController');


router.route('/')
.post(que.queLength,orderController.PostOrder, que.putInQue);

router.route('/:orderId')
.get(orderController.getStatus)
.delete(orderController.cancleOrder)

module.exports = router;