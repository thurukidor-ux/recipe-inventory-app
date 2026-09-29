const { validate } = require("../ajv");
const { updateIngredientSchema } = require("./validation");
const ingredientDao = require("../../dao/ingredient-dao");

async function updateAbl(req, res) {
  const reqDto = req.body;

  validate(updateIngredientSchema, reqDto);

  const updatedIngredient = await ingredientDao.update(reqDto);

  if (!updatedIngredient) {
    const error = new Error(`Ingredience s ID ${reqDto.id} nebyla nalezena`);
    error.status = 404;
    throw error;
  }

  res.json(updatedIngredient);
}

module.exports = updateAbl;
