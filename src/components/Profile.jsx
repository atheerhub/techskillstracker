import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const Profile = ({ currentUser, darkMode }) => {
  // حالات للتحكم في وضع التعديل والبيانات المدخلة
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleSave = () => {
    currentUser.name = userData.name;
    currentUser.email = userData.email;
    setIsEditing(false);
  };

  return (
    <Card className={`p-5 mb-4 shadow-sm border-0 rounded-4 ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          {/* أيقونة المستخدم */}
          <div className="bg-primary rounded-circle p-3 me-3 text-white shadow-sm">
            <i className="bi bi-person-fill fs-2"></i>
          </div>
          <div>
            <h2 className="h4 mb-0 fw-bold">User Profile</h2>
            <p className={`${darkMode ? 'text-light' : 'text-muted'} mb-0 opacity-75`}>
              {currentUser.role || "Member"}
            </p>
          </div>
        </div>
        
        {/* زر التعديل */}
        <Button 
          variant={isEditing ? "success" : "outline-primary"} 
          size="sm" 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <i className={`bi bi-${isEditing ? 'check-lg' : 'pencil-square'} me-1`}></i>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="border-top pt-4">
        {/* حقل الاسم */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-uppercase small opacity-75">Full Name</span>
          {isEditing ? (
            <Form.Control 
              size="sm" 
              className="w-50"
              value={userData.name} 
              onChange={(e) => setUserData({...userData, name: e.target.value})}
            />
          ) : (
            <span className="fs-5">{userData.name}</span>
          )}
        </div>

        {/* حقل الإيميل */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-uppercase small opacity-75">Email Address</span>
          {isEditing ? (
            <Form.Control 
              size="sm" 
              className="w-50"
              value={userData.email} 
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
          ) : (
            <span className="fs-5">{userData.email}</span>
          )}
        </div>

        {/* زر الإلغاء يظهر فقط أثناء التعديل */}
        {isEditing && (
          <div className="text-end mt-3">
            <Button variant="link" className="text-danger p-0" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Profile;