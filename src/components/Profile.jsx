import React from "react";
import { Card } from "react-bootstrap";

const Profile = ({ currentUser, darkMode }) => (
  <Card className={`p-4 mb-4 shadow ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
    <h2 className="h4 mb-3">User Profile</h2>
    <div className="mb-2">
      <span className="fw-bold">Name: </span>
      <span>{currentUser.name}</span>
    </div>
    <div className="mb-2">
      <span className="fw-bold">Email: </span>
      <span>{currentUser.email}</span>
    </div>
    <div className="mb-2">
      <span className="fw-bold">Role: </span>
      <span>{currentUser.role || "Member"}</span>
    </div>
    <p className="mt-3 text-muted">
    </p>
  </Card>
);

export default Profile;