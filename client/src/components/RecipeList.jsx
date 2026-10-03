import { useState, useEffect } from "react";
import api from "../api";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recipesRes, ingredientsRes] = await Promise.all([
        api.get("/recipe/list"),
        api.get("/ingredient/list"),
      ]);
      setRecipes(recipesRes.data);
      setIngredients(ingredientsRes.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Chyba při načítání dat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Načítám kuchařku a stav skladu...</p>;
  if (error) return <p style={{ color: "red" }}>Chyba: {error}</p>;

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>Seznam receptů</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: showForm ? "#e53e3e" : "#38a169",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          {showForm ? "Zavřít formulář" : "+ Přidat recept"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <RecipeForm
            ingredients={ingredients}
            onRecipeCreated={() => {
              setShowForm(false);
              fetchData();
            }}
          />
        </div>
      )}

      {recipes.length === 0 ? (
        <p>
          Žádné recepty zatím nebyly vytvořeny. Přidejte první recept tlačítkem
          výše.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              ingredients={ingredients}
              onCookSuccess={fetchData}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipeList;
