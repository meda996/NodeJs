const express = require('express');

const router = express.Router();

const adminController = require('../controller/adminController');

router.route('/')
.get(adminController.getInfo)
.post(adminController.login),

module.exports = router;