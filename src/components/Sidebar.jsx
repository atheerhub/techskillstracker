import React from "react";
import { Button, Nav } from "react-bootstrap";

const Sidebar = ({ view, setView, darkMode, setDarkMode, onLogout }) => {
  return (
    <aside 
      className={`d-flex flex-column p-4 border-end ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light'}`}
      style={{ width: "260px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold mb-4 text-uppercase border-bottom pb-3">
        <i className="bi bi-cpu-fill me-2 text-primary"></i>Tracker
      </h4>
      
      <Nav className="flex-column gap-2 flex-grow-1">
        <Button 
          variant={view === 'stats' ? 'primary' : 'link'} 
          className={`text-start text-decoration-none p-2 rounded-3 ${view !== 'stats' && (darkMode ? 'text-white' : 'text-dark')}`}
          onClick={() => setView("stats")}
        >
          <i className="bi bi-speedometer2 me-2"></i> Stats
        </Button>
        
        <Button 
          variant={view === 'list' ? 'primary' : 'link'} 
          className={`text-start text-decoration-none p-2 rounded-3 ${view !== 'list' && (darkMode ? 'text-white' : 'text-dark')}`}
          onClick={() => setView("list")}
        >
          <i className="bi bi-journal-code me-2"></i> Experiments
        </Button>
        
        <Button 
          variant={view === 'profile' ? 'primary' : 'link'} 
          className={`text-start text-decoration-none p-2 rounded-3 ${view !== 'profile' && (darkMode ? 'text-white' : 'text-dark')}`}
          onClick={() => setView("profile")}
        >
          <i className="bi bi-person-circle me-2"></i> Profile
        </Button>
      </Nav>

      <div className="mt-auto pt-4 border-top">
        <Button 
          variant={darkMode ? "outline-light" : "outline-dark"} 
          className="w-100 mb-2 rounded-3 shadow-none"
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-stars-fill'} me-2`}></i>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        
        <Button 
          variant="outline-danger" 
          className="w-100 rounded-3 shadow-none fw-bold"
          onClick={onLogout}
        >
          <i className="bi bi-box-arrow-left me-2"></i> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;