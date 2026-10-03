import { useState } from "react";
import Navbar from "./components/Navbar";
import InventoryList from "./components/InventoryList";
import RecipeList from "./components/RecipeList"; // Import nového kontejneru

function App() {
  const [activeTab, setActiveTab] = useState("inventory"); //

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: "0 0 16px 0", color: "#1a202c" }}>
          Správce receptů a skladu
        </h1>
        <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
      </header>

      <main>
        {activeTab === "inventory" ? <InventoryList /> : <RecipeList />}
      </main>
    </div>
  );
}

export default App;
