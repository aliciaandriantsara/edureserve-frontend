import { useState, useEffect } from "react";
import Badge from "../components/Badge";
import Modal from "../components/Modal";

function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de la norme moderne : async/await avec try...catch...finally
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/rooms");

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer les salles depuis le serveur Laravel.",
          );
        }

        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Le bloc finally s'exécute dans tous les cas (succès ou erreur), idéal pour couper le chargement
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const getBadgeType = (status) => {
    if (status === "Disponible") return "green";
    if (status === "En maintenance") return "orange";
    return "red";
  };

  const filteredRooms = rooms.filter((room) =>
    (room.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="content-area">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "8px" }}>Gestion des Salles</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Liste des salles connectée à ton API Laravel EduReserve.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Rechercher une salle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              width: "280px",
              fontSize: "14px",
            }}
          />
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            + Nouvelle salle
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header-title">
          <h3>Inventaire des salles (Backend Laravel)</h3>
        </div>

        {loading && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            Chargement des données depuis Laravel...
          </div>
        )}

        {error && (
          <div style={{ padding: "32px", textAlign: "center", color: "red" }}>
            Erreur : {error} <br />
            <small>
              Vérifie bien que ton serveur Laravel tourne avec `php artisan
              serve`.
            </small>
          </div>
        )}

        {!loading && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nom de la salle</th>
                <th>Capacité</th>
                <th>Équipement</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <strong>{room.name}</strong>
                  </td>
                  <td>{room.capacity} places</td>
                  <td>{room.equipment}</td>
                  <td>
                    <Badge
                      type={getBadgeType(room.status)}
                      text={room.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && filteredRooms.length === 0 && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            Aucune salle ne correspond à votre recherche "{searchTerm}".
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une salle"
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          Déclarez une nouvelle salle dans le système.
        </p>
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              Nom de la salle
            </label>
            <input
              type="text"
              placeholder="Ex: Salle 205"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              Capacité (nombre de places)
            </label>
            <input
              type="number"
              placeholder="Ex: 30"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default Rooms;
