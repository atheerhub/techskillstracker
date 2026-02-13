import React from "react";
import { Card } from "react-bootstrap";

const StatCard = ({ title, count, dark, icon }) => (
  <Card 
    className={`h-100 shadow-sm border-0 border-start border-5 rounded-3 transition-all ${
      dark 
      ? 'bg-secondary text-white' 
      : 'bg-white text-dark'
    }`} 
    style={{ borderColor: "#4e73df !important" }} // جعلت اللون ثابت للحدود الجانبية
  >
    <Card.Body className="d-flex justify-content-between align-items-center p-4">
      <div>
        <div className="text-uppercase mb-1 fw-bold opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
          {title}
        </div>
        <div className="h3 mb-0 fw-bold">{count}</div>
      </div>
      
      {icon && (
        <div className="fs-1 opacity-25 text-primary">
          {/* هنا نتأكد أن الأيقونة ستظهر بشكل كبير وجميل */}
          {icon}
        </div>
      )}
    </Card.Body>
  </Card>
);

export default StatCard;