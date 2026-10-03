import { useState, useEffect } from "react";
import api from "../api";

function InventoryList() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("g");

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/ingredient/list");
      setIngredients(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Chyba při načítání skladu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/ingredient/create", {
        name,
        stock: Number(stock),
        unit,
      });
      setName("");
      setStock("");
      setUnit("g");
      fetchIngredients();
    } catch (err) {
      alert(err.response?.data?.error || "Nelze přidat surovinu");
    }
  };

  const handleUpdateStock = async (id, currentStock, delta) => {
    const newStock = currentStock + delta;
    if (newStock < 0) return;

    try {
      await api.post("/ingredient/update", {
        id,
        stock: newStock,
      });
      fetchIngredients();
    } catch (err) {
      alert(err.response?.data?.error || "Chyba při aktualizaci množství");
    }
  };

  if (loading) return <p>Načítám zásoby ze skladu...</p>;
  if (error) return <p style={{ color: "red" }}>Chyba: {error}</p>;

  return (
    <section>
      <h3>Zásoby ve skladu</h3>

      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Název suroviny"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Množství"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="ks">ks</option>
        </select>
        <button type="submit">Přidat surovinu</button>
      </form>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f7fafc", textAlign: "left" }}>
            <th>Název</th>
            <th>Množství na skladě</th>
            <th>Jednotka</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.unit}</td>
              <td>
                <button
                  onClick={() => handleUpdateStock(item.id, item.stock, 50)}
                >
                  +50
                </button>{" "}
                <button
                  onClick={() => handleUpdateStock(item.id, item.stock, -50)}
                >
                  -50
                </button>
              </td>
            </tr>
          ))}
          {ingredients.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Sklad je prázdný. Přidejte první surovinu výše.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default InventoryList;
