import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <div className="app-layout">
      {/* 1. La barre latérale (Le Menu) */}
      <aside className="sidebar">
        <h2
          style={{
            fontSize: "22px",
            color: "var(--blue-900)",
            marginBottom: "32px",
          }}
        >
          EduReserve
        </h2>

        <nav>
          {/* Les liens de navigation */}
          <Link to="/" className="nav-link">
            🏠 Tableau de bord
          </Link>
          <Link to="/salles" className="nav-link">
            🚪 Gestion des Salles
          </Link>
        </nav>
      </aside>

      {/* 2. La zone principale (Le Cadre) */}
      <div className="main-wrapper">
        <header className="topbar">
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            🔍 Recherche...
          </span>
          <span style={{ fontWeight: 600, fontSize: "14px" }}>Mon Profil</span>
        </header>

        {/* 3. Le contenu dynamique (Change selon le lien cliqué) */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/salles" element={<Rooms />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
