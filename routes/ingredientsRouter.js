const express = require('express');

const router = express.Router();

const ingredientsController = require('../controller/ingredientsController');

router.route('/')
.get(ingredientsController.getIngredients);

module.exports = router;