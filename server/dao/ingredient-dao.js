const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const STORAGE_DIR = path.join(__dirname, '../storage/ingredients');
const getFilePath = (id) => path.join(STORAGE_DIR, `${id}.json`);
const ingredientDao = {
    /**
     * *@param {string} id
     * @returns {Promise<Object|null>}
     */
    async get(id) {
        const filePath = getFilePath(id);
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error){
            if (error.code === 'ENOENT'){
                return null;
            }
            throw error;
            
        }
    },
    /**
     * @returns {Promise<Array<Object>>}
     */
    async list(){
try {
    const files = await fs.readdir(STORAGE_DIR);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    const ingredients = await Promise.all(
        jsonFiles.map(async(file) => {
            const content = await fs.readFile(path.join(STORAGE_DIR, file), 'utf-8');
            return JSON.parse(content);
        })
    );
    return ingredients;
} catch (error) {
    if (error.code === 'ENOENT') {
        return [];
    }
    throw error;

}
},

    /**
     * @param {Object} ingredient - {name,stock,unit}
     * @returns {Promise<Object>}
     */
    async create (ingredient){
        const id = uuidv4();
        const newIngredient = {
            id,
            ...ingredient,
        };
        const filePath = getFilePath(id);
        await fs.writeFile(filePath,JSON.stringify(newIngredient, null,2), 'utf-8');
        return newIngredient;

    },
    /**
     * @param {Object} ingredient
     * @returns {Promise<Object|null>}
     */
    async update (ingredient) {
        if (!ingredient.id) {
            throw new Error('Nelze aktualizovat ingredience bez platneho ID');
        }
        const existing = await this.get(ingredient.id);
        if (!existing){
            return null;
        }
        const updated = {
            ...existing,
            ...ingredient,
        };
        const filePath = getFilePath(ingredient.id);
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  },

  /**
   * Smaže soubor ingredience podle ID
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const filePath = getFilePath(id);
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  },
};
module.exports = ingredientDao;