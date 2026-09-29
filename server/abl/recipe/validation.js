const createRecipeSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: "string",
      minLength: 5,
      maxLength: 1000,
    },
    ingredients: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          ingredientId: {
            type: "string",
            format: "uuid",
          },
          amount: {
            type: "number",
            exclusiveMinimum: 0,
          },
        },
        required: ["ingredientId", "amount"],
        additionalProperties: false,
      },
    },
  },
  required: ["name", "description", "ingredients"],
  additionalProperties: false,
};

const getRecipeSchema = {
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

const updateRecipeSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: "string",
      minLength: 5,
      maxLength: 1000,
    },
    ingredients: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          ingredientId: {
            type: "string",
            format: "uuid",
          },
          amount: {
            type: "number",
            exclusiveMinimum: 0,
          },
        },
        required: ["ingredientId", "amount"],
        additionalProperties: false,
      },
    },
  },
  required: ["id"],
  minProperties: 2,
  additionalProperties: false,
};

const deleteRecipeSchema = {
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

const cookRecipeSchema = {
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
  createRecipeSchema,
  getRecipeSchema,
  updateRecipeSchema,
  deleteRecipeSchema,
  cookRecipeSchema,
};
