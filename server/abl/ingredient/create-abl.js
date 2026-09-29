const { validate } = require("../ajv");
const { createIngredientSchema } = require("./validation");
const ingredientDao = require("../../dao/ingredient-dao");

async function createAbl(req, res) {
  const reqDto = req.body;

  validate(createIngredientSchema, reqDto);

  const createdIngredient = await ingredientDao.create(reqDto);

  res.status(201).json(createdIngredient);
}

module.exports = createAbl;
