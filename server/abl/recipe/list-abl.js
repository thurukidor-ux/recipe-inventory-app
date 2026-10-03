const recipeDao = require("../../dao/recipe-dao");

async function listAbl(req, res) {
  const recipeList = await recipeDao.list();

  res.json(recipeList);
}

module.exports = listAbl;
