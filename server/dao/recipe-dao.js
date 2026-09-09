const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const STORAGE_DIR = path.join(__dirname, "../storage/recipes");

const getFilePath = (id) => path.join(STORAGE_DIR, `${id}.json`);

const recipeDao = {
  async get(id) {
    const filePath = getFilePath(id);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    }
  },

  async list() {
    try {
      const files = await fs.readdir(STORAGE_DIR);
      const jsonFiles = files.filter((file) => file.endsWith(".json"));

      const recipes = await Promise.all(
        jsonFiles.map(async (file) => {
          const content = await fs.readFile(
            path.join(STORAGE_DIR, file),
            "utf-8",
          );
          return JSON.parse(content);
        }),
      );

      return recipes;
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  },

  async create(recipe) {
    const id = uuidv4();
    const newRecipe = {
      id,
      ...recipe,
    };

    const filePath = getFilePath(id);
    await fs.writeFile(filePath, JSON.stringify(newRecipe, null, 2), "utf-8");
    return newRecipe;
  },

  async update(recipe) {
    if (!recipe.id) {
      throw new Error("Nelze aktualizovat recept bez platného ID.");
    }

    const existing = await this.get(recipe.id);
    if (!existing) {
      return null;
    }

    const updated = {
      ...existing,
      ...recipe,
    };

    const filePath = getFilePath(recipe.id);
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
    return updated;
  },

  async delete(id) {
    const filePath = getFilePath(id);
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }
  },
};

module.exports = recipeDao;
