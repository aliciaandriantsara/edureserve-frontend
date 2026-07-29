import { useState } from "react";
import Badge from "../components/Badge";
import Modal from "../components/Modal";

function Rooms() {
  // 1. État pour mémoriser ce que l'utilisateur tape dans la barre de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // 2. État pour contrôler l'ouverture (true) ou la fermeture (false) de la modale d'ajout de salle
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notre fausse liste de données (les salles)
  const roomsData = [
    {
      id: 1,
      name: "Amphi A",
      capacity: 250,
      equipment: "Projecteur, Micro",
      status: "Disponible",
    },
    {
      id: 2,
      name: "Labo Informatique 2",
      capacity: 30,
      equipment: "30 PC, Tableau interactif",
      status: "En maintenance",
    },
    {
      id: 3,
      name: "Salle 104",
      capacity: 40,
      equipment: "Tableau blanc",
      status: "Disponible",
    },
    {
      id: 4,
      name: "Salle de réunion B",
      capacity: 10,
      equipment: "Écran, Pieuvre audio",
      status: "Occupée",
    },
  ];

  // Fonction utilitaire pour choisir la couleur du badge selon le statut
  const getBadgeType = (status) => {
    if (status === "Disponible") return "green";
    if (status === "En maintenance") return "orange";
    return "red";
  };

  // Filtrage automatique des salles en fonction de ce qui est tapé dans la recherche
  const filteredRooms = roomsData.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="content-area">
      {/* En-tête avec titre, barre de recherche et bouton d'ouverture de la modale */}
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
            Voici la liste de toutes les salles disponibles pour EduReserve.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Barre de recherche */}
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

          {/* Bouton pour ouvrir la modale d'ajout de salle */}
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            + Nouvelle salle
          </button>
        </div>
      </div>

      {/* Tableau affichant la liste filtrée */}
      <div className="table-container">
        <div className="table-header-title">
          <h3>Inventaire des salles</h3>
        </div>

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
            {/* Boucle .map pour afficher dynamiquement chaque salle */}
            {filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <strong>{room.name}</strong>
                </td>
                <td>{room.capacity} places</td>
                <td>{room.equipment}</td>
                <td>
                  <Badge type={getBadgeType(room.status)} text={room.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Message affiché si la recherche ne donne aucun résultat */}
        {filteredRooms.length === 0 && (
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

      {/* 3. La même modale réutilisable, mais avec un formulaire spécifique aux salles à l'intérieur */}
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
