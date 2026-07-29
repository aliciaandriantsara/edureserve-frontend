// StatCard reçoit 3 props : title, value, icon
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <span style={{ fontSize: "20px" }}>{icon}</span>
      </div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
}

export default StatCard;
