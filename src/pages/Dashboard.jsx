import { useState } from "react";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import Modal from "../components/Modal";

function Dashboard() {
  // 1. État pour contrôler l'ouverture (true) ou la fermeture (false) de la modale de réservation
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="content-area">
      {/* En-tête de la page avec titre et bouton d'action */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "4px" }}>Tableau de bord</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Aperçu rapide de l'activité sur la plateforme.
          </p>
        </div>

        {/* Au clic, on fait passer l'état à "true" pour afficher la modale */}
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Nouvelle réservation
        </button>
      </div>

      {/* Grille des 4 cartes d'indicateurs */}
      <div className="stat-grid">
        <StatCard title="Salles réservées" value="12" icon="🚪" />
        <StatCard title="Demandes en attente" value="5" icon="⏳" />
        <StatCard title="Utilisateurs actifs" value="148" icon="👥" />
        <StatCard title="Taux d'occupation" value="84%" icon="📊" />
      </div>

      {/* Tableau des dernières demandes */}
      <div className="table-container">
        <div className="table-header-title">
          <h3>Dernières demandes de réservation</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Demandeur</th>
              <th>Salle</th>
              <th>Date & Heure</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Marie Curie</strong>
              </td>
              <td>Amphi A</td>
              <td>28 Juillet - 14:00</td>
              <td>
                <Badge type="green" text="Approuvée" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Alan Turing</strong>
              </td>
              <td>Labo Informatique 2</td>
              <td>29 Juillet - 10:00</td>
              <td>
                <Badge type="orange" text="En attente" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Le composant Modal réutilisable 
        - isOpen : contrôle s'il s'affiche ou non
        - onClose : fonction pour le fermer
        - title : le titre affiché en haut de la fenêtre
        - Tout ce qui est placé entre <Modal> et </Modal> constitue la prop "children" (le formulaire de réservation)
      */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle réservation"
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          Remplissez les informations pour réserver une salle.
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
              placeholder="Ex: Amphi A"
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
              Nom du demandeur
            </label>
            <input
              type="text"
              placeholder="Ex: Marie Curie"
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

export default Dashboard;
