const { validate } = require("../ajv");
const { getRecipeSchema } = require("./validation");
const recipeDao = require("../../dao/recipe-dao");

async function getAbl(req, res) {
  const reqDto = req.method === "GET" ? req.query : req.body;

  validate(getRecipeSchema, reqDto);

  const recipe = await recipeDao.get(reqDto.id);

  if (!recipe) {
    const error = new Error(`Recept s ID ${reqDto.id} nebyl nalezen`);
    error.status = 404;
    throw error;
  }

  res.json(recipe);
}

module.exports = getAbl;
