import { useState } from "react";
import api from "../api";

function RecipeForm({ ingredients, onRecipeCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([
    { ingredientId: ingredients[0]?.id || "", amount: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleAddIngredientRow = () => {
    setRecipeIngredients([
      ...recipeIngredients,
      { ingredientId: ingredients[0]?.id || "", amount: "" },
    ]);
  };

  const handleRemoveIngredientRow = (indexToRemove) => {
    if (recipeIngredients.length === 1) {
      alert("Recept musí obsahovat alespoň jednu surovinu.");
      return;
    }
    setRecipeIngredients(
      recipeIngredients.filter((_, idx) => idx !== indexToRemove),
    );
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = recipeIngredients.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setRecipeIngredients(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    for (const item of recipeIngredients) {
      if (!item.ingredientId) {
        setError("Vyberte platnou surovinu pro všechny řádky.");
        return;
      }
      if (!item.amount || Number(item.amount) <= 0) {
        setError("Množství každé suroviny musí být větší než 0.");
        return;
      }
    }

    const payload = {
      name,
      description,
      ingredients: recipeIngredients.map((item) => ({
        ingredientId: item.ingredientId,
        amount: Number(item.amount),
      })),
    };

    try {
      setSubmitting(true);
      await api.post("/recipe/create", payload);
      if (onRecipeCreated) {
        onRecipeCreated();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Chyba při vytváření receptu");
    } finally {
      setSubmitting(false);
    }
  };

  if (ingredients.length === 0) {
    return (
      <p style={{ color: "#c53030" }}>
        Nejprve musíte v záložce <strong>Sklad surovin</strong> vytvořit alespoň
        jednu surovinu, abyste z ní mohli poskládat recept.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <h4 style={{ margin: 0, color: "#2d3748" }}>Nový recept</h4>

      {error && (
        <div style={{ color: "#c53030", fontWeight: "bold" }}>{error}</div>
      )}

      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}
        >
          Název receptu:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="např. Palačinky"
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}
        >
          Popis a postup:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Popište stručně přípravu receptu..."
          rows="3"
          required
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
        >
          Potřebné suroviny:
        </label>
        {recipeIngredients.map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <select
              value={row.ingredientId}
              onChange={(e) =>
                handleIngredientChange(index, "ingredientId", e.target.value)
              }
              style={{ flex: 2, padding: "8px" }}
            >
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} ({ing.unit})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={row.amount}
              onChange={(e) =>
                handleIngredientChange(index, "amount", e.target.value)
              }
              placeholder="Množství"
              required
              style={{ flex: 1, padding: "8px" }}
            />

            <button
              type="button"
              onClick={() => handleRemoveIngredientRow(index)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: "#fed7d7",
                color: "#742a2a",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Odstranit
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddIngredientRow}
          style={{ padding: "6px 12px", cursor: "pointer", marginTop: "4px" }}
        >
          + Přidat další surovinu
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: "10px 16px",
          backgroundColor: "#3182ce",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Ukládám recept..." : "Vytvořit recept"}
      </button>
    </form>
  );
}

export default RecipeForm;
