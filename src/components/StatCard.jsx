import React from "react";

const StatCard = ({ title, count, dark, icon }) => (
  <div className={`p-4 rounded-lg border shadow-sm h-100 transition-all ${
    dark 
    ? 'bg-secondary text-white border-secondary-subtle' 
    : 'bg-white text-dark border-light'
  }`} style={{ borderLeft: "5px solid #4e73df" }}>
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <p className="text-uppercase mb-1 fw-bold opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
          {title}
        </p>
        <p className="h4 mb-0 fw-bold">{count}</p>
      </div>
      {icon && <div className="text-primary opacity-50 h3">{icon}</div>}
    </div>
  </div>
);

export default StatCard;