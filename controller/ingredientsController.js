const createError = require('http-errors');
const Ingredients = require('../model/ingredients');

exports.getIngredients = async (req,res,next) => {
    try {
        const ingredients = await Ingredients.find();

        console.log(ingredients);

        res.status(200).send({ingredients:ingredients})
    } catch (e) {
        next(e);
    }
}