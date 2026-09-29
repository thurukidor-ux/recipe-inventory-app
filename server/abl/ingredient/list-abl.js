const ingredientDao = require("../../dao/ingredient-dao");

async function listAbl(req, res) {
  const ingredientList = await ingredientDao.list();

  res.json(ingredientList);
}

module.exports = listAbl;
