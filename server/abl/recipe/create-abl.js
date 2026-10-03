const { validate } = require("../ajv");
const { createRecipeSchema } = require("./validation");
const recipeDao = require("../../dao/recipe-dao");

async function createAbl(req, res) {
  const reqDto = req.body;

  validate(createRecipeSchema, reqDto);

  const createdRecipe = await recipeDao.create(reqDto);

  res.status(201).json(createdRecipe);
}

module.exports = createAbl;
