const { validate } = require("../ajv");
const { cookRecipeSchema } = require("./validation");
const recipeDao = require("../../dao/recipe-dao");
const ingredientDao = require("../../dao/ingredient-dao");

async function cookAbl(req, res) {
  const reqDto = req.body;

  validate(cookRecipeSchema, reqDto);

  const recipe = await recipeDao.get(reqDto.id);
  if (!recipe) {
    const error = new Error(`Recept s ID ${reqDto.id} nebyl nalezen`);
    error.status = 404;
    throw error;
  }

  const missingIngredients = [];
  const ingredientsToUpdate = [];

  for (const item of recipe.ingredients) {
    const ingredient = await ingredientDao.get(item.ingredientId);

    if (!ingredient) {
      missingIngredients.push({
        ingredientId: item.ingredientId,
        error: "Surovina neexistuje na skladě",
      });
      continue;
    }

    if (ingredient.stock < item.amount) {
      missingIngredients.push({
        ingredientId: item.ingredientId,
        name: ingredient.name,
        required: item.amount,
        available: ingredient.stock,
        unit: ingredient.unit,
        error: "Nedostatečné množství na skladě",
      });
    } else {
      ingredientsToUpdate.push({
        id: ingredient.id,
        stock: ingredient.stock - item.amount,
      });
    }
  }

  if (missingIngredients.length > 0) {
    const error = new Error("Recept nelze uvařit z důvodu nedostatku surovin");
    error.status = 400;
    error.errors = missingIngredients;
    throw error;
  }

  for (const updateData of ingredientsToUpdate) {
    await ingredientDao.update(updateData);
  }

  res.json({ message: "Recept byl úspěšně uvařen a suroviny odepsány" });
}

module.exports = cookAbl;
