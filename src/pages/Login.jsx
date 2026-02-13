import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 1. التحقق من تعبئة جميع الحقول
    if (!name || !email || !password) {
      return setError("All fields are required.");
    }

    // 2. التحقق الذكي من صيغة الإيميل (Regex)
    // هذا السطر يضمن وجود @ وجود .com أو أي نطاق آخر
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address (e.g., name@example.com).");
    }

    // 3. التحقق من طول كلمة المرور
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    // إذا كل شيء تمام، يتم تسجيل الدخول
    onLogin({ name, email });
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #7aabdb 0%, #7ae9a8 100%)",
        padding: "20px"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0" style={{ borderRadius: "25px", overflow: "hidden" }}>
              <Card.Body className="p-5">
                
                <div className="text-center mb-4">
                  <div 
                    className="bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: "60px", height: "60px", borderRadius: "15px", fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    TST
                  </div>
                  <h2 className="fw-bold text-dark">Tech Skill Tracker</h2>
                  <p className="text-muted small">Log in to track your skills</p>
                </div>

                {/* عرض تنبيه رسالة الخطأ  */}
                {error && <Alert variant="danger" className="py-2 small text-center border-0 rounded-3">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 text-start">
                    <Form.Label className="small fw-bold text-secondary ps-1">Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your name" 
                      className="py-2 border-0 bg-light shadow-none" 
                      style={{ borderRadius: "10px" }}
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-start">
                    <Form.Label className="small fw-bold text-secondary ps-1">Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      className="py-2 border-0 bg-light shadow-none" 
                      style={{ borderRadius: "10px" }}
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 text-start">
                    <Form.Label className="small fw-bold text-secondary ps-1">Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="••••••••" 
                      className="py-2 border-0 bg-light shadow-none" 
                      style={{ borderRadius: "10px" }}
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2 fw-bold shadow-sm border-0" 
                    style={{ borderRadius: "10px", transition: "0.3s" }}
                  >
                    Login
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                    © 2026 Tech Skill Tracker
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;