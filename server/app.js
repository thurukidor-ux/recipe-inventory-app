const express = require("express");
const cors = require("cors");

const createIngredientAbl = require("./abl/ingredient/create-abl");
const getIngredientAbl = require("./abl/ingredient/get-abl");
const listIngredientAbl = require("./abl/ingredient/list-abl");
const updateIngredientAbl = require("./abl/ingredient/update-abl");
const deleteIngredientAbl = require("./abl/ingredient/delete-abl");

const createRecipeAbl = require("./abl/recipe/create-abl");
const getRecipeAbl = require("./abl/recipe/get-abl");
const listRecipeAbl = require("./abl/recipe/list-abl");
const updateRecipeAbl = require("./abl/recipe/update-abl");
const deleteRecipeAbl = require("./abl/recipe/delete-abl");
const cookRecipeAbl = require("./abl/recipe/cook-abl");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/ingredient/create", createIngredientAbl);
app.get("/ingredient/get", getIngredientAbl);
app.get("/ingredient/list", listIngredientAbl);
app.post("/ingredient/update", updateIngredientAbl);
app.post("/ingredient/delete", deleteIngredientAbl);

app.post("/recipe/create", createRecipeAbl);
app.get("/recipe/get", getRecipeAbl);
app.get("/recipe/list", listRecipeAbl);
app.post("/recipe/update", updateRecipeAbl);
app.post("/recipe/delete", deleteRecipeAbl);
app.post("/recipe/cook", cookRecipeAbl);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message,
    errors: err.errors || undefined,
  });
});

app.listen(PORT, () => {
  console.log(`[Server] Běží na http://localhost:${PORT}`);
});
