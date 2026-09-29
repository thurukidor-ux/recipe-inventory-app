const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

/**
 * Zvaliduje data proti předanému JSON schématu.
 * Pokud jsou data nevalidní, vyhodí standardizovanou chybu.
 *
 * @param {Object} schema - JSON Schema
 * @param {Object} data - Data k ověření
 */
function validate(schema, data) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    const error = new Error("Nevalidní vstupní data");
    error.status = 400;
    error.errors = ajv.errors;
    throw error;
  }
}

module.exports = { ajv, validate };
