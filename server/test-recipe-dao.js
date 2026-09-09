// server/test-recipe-dao.js
const recipeDao = require("./dao/recipe-dao");

async function testRecipe() {
  console.log("1. Vytvářím recept na Bábovku...");
  const babovka = await recipeDao.create({
    name: "Bábovka",
    description: "Klasická bábovka",
    ingredients: [
      { ingredientId: "06b587d7-8389-4a71-aada-888fe7313d30", amount: 300 },
      { ingredientId: "dalsi-id-cukr", amount: 200 },
    ],
  });
  console.log("Vytvořeno:", babovka);

  console.log("\n2. Čtu recept podle ID...");
  const found = await recipeDao.get(babovka.id);
  console.log("Nalezeno:", found.name);

  console.log("\n3. Aktualizuji popis...");
  const updated = await recipeDao.update({
    id: babovka.id,
    description: "Nejlepší bábovka",
  });
  console.log("Nový popis:", updated.description);

  console.log("\n4. Mazání testovacího receptu...");
  await recipeDao.delete(babovka.id);
  console.log("Hotovo.");
}

testRecipe().catch(console.error);
