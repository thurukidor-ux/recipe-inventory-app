import { useState } from "react";
import api from "../api";

function RecipeCard({ recipe, ingredients, onCookSuccess }) {
  const [cooking, setCooking] = useState(false);

  const missingIngredients = [];

  recipe.ingredients.forEach((requiredItem) => {
    const stockItem = ingredients.find(
      (i) => i.id === requiredItem.ingredientId,
    );

    if (!stockItem) {
      missingIngredients.push({
        name: "Neznámá surovina",
        missingAmount: requiredItem.amount,
        unit: "",
      });
    } else if (stockItem.stock < requiredItem.amount) {
      missingIngredients.push({
        name: stockItem.name,
        missingAmount: requiredItem.amount - stockItem.stock,
        unit: stockItem.unit,
      });
    }
  });

  const canCook = missingIngredients.length === 0;

  const handleCook = async () => {
    try {
      setCooking(true);
      await api.post("/recipe/cook", { id: recipe.id });
      alert(`Recept "${recipe.name}" byl úspěšně uvařen!`);
      if (onCookSuccess) {
        onCookSuccess();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Recept se nepodařilo uvařit");
    } finally {
      setCooking(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#2d3748" }}
        >
          {recipe.name}
        </h4>
        <p
          style={{ margin: "0 0 12px 0", color: "#718096", fontSize: "0.9rem" }}
        >
          {recipe.description}
        </p>

        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              backgroundColor: canCook ? "#c6f6d5" : "#fed7d7",
              color: canCook ? "#22543d" : "#742a2a",
            }}
          >
            {canCook ? "✓ Lze uvařit" : "✕ Nelze uvařit (chybí suroviny)"}
          </span>
        </div>

        <h5 style={{ margin: "0 0 8px 0", fontSize: "0.95rem" }}>
          Potřebné suroviny:
        </h5>
        <ul
          style={{
            paddingLeft: "20px",
            margin: "0 0 16px 0",
            fontSize: "0.9rem",
          }}
        >
          {recipe.ingredients.map((reqItem) => {
            const stockItem = ingredients.find(
              (i) => i.id === reqItem.ingredientId,
            );
            const itemName = stockItem ? stockItem.name : "Neznámá surovina";
            const itemUnit = stockItem ? stockItem.unit : "";

            return (
              <li key={reqItem.ingredientId}>
                {itemName}: {reqItem.amount} {itemUnit}
              </li>
            );
          })}
        </ul>

        {!canCook && (
          <div
            style={{
              backgroundColor: "#fff5f5",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          >
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#c53030",
              }}
            >
              Chybí naskladnit:
            </p>
            <ul
              style={{
                paddingLeft: "16px",
                margin: 0,
                fontSize: "0.8rem",
                color: "#9b2c2c",
              }}
            >
              {missingIngredients.map((missing, index) => (
                <li key={index}>
                  {missing.name}: chybí {missing.missingAmount} {missing.unit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleCook}
        disabled={!canCook || cooking}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          fontWeight: "600",
          cursor: canCook && !cooking ? "pointer" : "not-allowed",
          backgroundColor: canCook ? "#3182ce" : "#cbd5e0",
          color: canCook ? "#ffffff" : "#a0aec0",
          transition: "background-color 0.2s ease",
        }}
      >
        {cooking ? "Vařím..." : "Uvařit recept"}
      </button>
    </div>
  );
}

export default RecipeCard;
