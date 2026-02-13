import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = ({ userName, darkMode }) => (
  <Navbar 
    className={`p-4 border-bottom ${darkMode ? 'bg-dark navbar-dark border-secondary' : 'bg-white navbar-light border-light'}`}
  >
    <Container fluid className="d-flex justify-content-between align-items-center">
      <h1 className="h4 fw-bold mb-0">
        Welcome, <span className={darkMode ? 'text-info' : 'text-primary'}>{userName}</span>
      </h1>
    </Container>
  </Navbar>
);

export default Header;