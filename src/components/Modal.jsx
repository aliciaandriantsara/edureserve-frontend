// On ajoute 'title' (pour changer le titre selon la page) et 'children' (le contenu sur mesure)
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* En-tête de la modale */}
        <div>
          <h2 style={{ marginBottom: "24px" }}>{title}</h2>

          {/* C'est ICI que s'affichera le contenu qu'on passera à la modale */}
          {children}
        </div>

        {/* Boutons d'action en bas */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "32px",
          }}
        >
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" onClick={onClose}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
