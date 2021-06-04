const express = require('express');

const router = express.Router();

const orderController = require('../controller/orderController');

router.route('/')
.post(orderController.PostOrder);


module.exports = router;