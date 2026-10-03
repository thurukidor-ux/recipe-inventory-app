const { validate } = require("../ajv");
const { deleteRecipeSchema } = require("./validation");
const recipeDao = require("../../dao/recipe-dao");

async function deleteAbl(req, res) {
  const reqDto = req.method === "GET" ? req.query : req.body;

  validate(deleteRecipeSchema, reqDto);

  const deleted = await recipeDao.delete(reqDto.id);

  if (!deleted) {
    const error = new Error(`Recept s ID ${reqDto.id} nebyl nalezen`);
    error.status = 404;
    throw error;
  }

  res.json({});
}

module.exports = deleteAbl;
