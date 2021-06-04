const express = require('express');
const QUE = require('../que');

const router = express.Router();

const orderController = require('../controller/orderController');

const que = [];

router.route('/')
.post(QUE.queLength,orderController.PostOrder);

module.exports.que = que;
module.exports = router;