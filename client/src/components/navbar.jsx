function Navbar({ activeTab, onSelectTab }) {
  const getButtonStyle = (tabName) => ({
    padding: "10px 18px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    backgroundColor: activeTab === tabName ? "#3182ce" : "#edf2f7",
    color: activeTab === tabName ? "#ffffff" : "#4a5568",
    transition: "background-color 0.2s ease",
  });

  return (
    <nav style={{ display: "flex", gap: "12px" }}>
      <button
        onClick={() => onSelectTab("inventory")}
        style={getButtonStyle("inventory")}
      >
        Sklad surovin
      </button>

      <button
        onClick={() => onSelectTab("recipes")}
        style={getButtonStyle("recipes")}
      >
        Kuchařka a recepty
      </button>
    </nav>
  );
}

export default Navbar;
