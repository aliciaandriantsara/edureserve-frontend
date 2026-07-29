// Ce composant reçoit 2 props : 'type' (green, orange, red) et 'text'
function Badge({ type, text }) {
  return <span className={`pill pill-${type}`}>{text}</span>;
}

export default Badge;
