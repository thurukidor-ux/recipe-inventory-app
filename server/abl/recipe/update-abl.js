const { validate } = require("../ajv");
const { updateRecipeSchema } = require("./validation");
const recipeDao = require("../../dao/recipe-dao");

async function updateAbl(req, res) {
  const reqDto = req.body;

  validate(updateRecipeSchema, reqDto);

  const updatedRecipe = await recipeDao.update(reqDto);

  if (!updatedRecipe) {
    const error = new Error(`Recept s ID ${reqDto.id} nebyl nalezen`);
    error.status = 404;
    throw error;
  }

  res.json(updatedRecipe);
}

module.exports = updateAbl;
