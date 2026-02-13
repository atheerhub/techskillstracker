import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { initialExperiments } from "./data/experimentsData"; 

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard 
          currentUser={user} 
          onLogout={handleLogout} 
          experiments={initialExperiments} 
        />
      )}
    </div>
  );
}

export default App;