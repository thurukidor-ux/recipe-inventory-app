const { validate } = require("../ajv");
const { getIngredientSchema } = require("./validation");
const ingredientDao = require("../../dao/ingredient-dao");

async function getAbl(req, res) {
  const reqDto = req.method === "GET" ? req.query : req.body;

  validate(getIngredientSchema, reqDto);

  const ingredient = await ingredientDao.get(reqDto.id);

  if (!ingredient) {
    const error = new Error(`Ingredience s ID ${reqDto.id} nebyla nalezena`);
    error.status = 404;
    throw error;
  }

  res.json(ingredient);
}

module.exports = getAbl;
