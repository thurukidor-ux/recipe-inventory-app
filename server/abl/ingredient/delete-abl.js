const { validate } = require("../ajv");
const { deleteIngredientSchema } = require("./validation");
const ingredientDao = require("../../dao/ingredient-dao");

async function deleteAbl(req, res) {
  const reqDto = req.method === "GET" ? req.query : req.body;

  validate(deleteIngredientSchema, reqDto);

  const deleted = await ingredientDao.delete(reqDto.id);

  if (!deleted) {
    const error = new Error(`Ingredience s ID ${reqDto.id} nebyla nalezena`);
    error.status = 404;
    throw error;
  }

  res.json({});
}

module.exports = deleteAbl;
