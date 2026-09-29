const createIngredientSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    stock: {
      type: "number",
      minimum: 0,
    },
    unit: {
      type: "string",
      enum: ["g", "ml", "ks"],
    },
  },
  required: ["name", "stock", "unit"],
  additionalProperties: false,
};

const getIngredientSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

const updateIngredientSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    stock: {
      type: "number",
      minimum: 0,
    },
    unit: {
      type: "string",
      enum: ["g", "ml", "ks"],
    },
  },
  required: ["id"],
  minProperties: 2,
  additionalProperties: false,
};

const deleteIngredientSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

module.exports = {
  createIngredientSchema,
  getIngredientSchema,
  updateIngredientSchema,
  deleteIngredientSchema,
};
