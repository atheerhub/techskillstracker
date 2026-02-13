import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ExperimentForm = ({ onSave, initialData, darkMode }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [problem, setProblem] = useState(initialData?.problem || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [category, setCategory] = useState(initialData?.category || "Frontend");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setProblem(initialData.problem);
      setSolution(initialData.solution);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !problem || !solution) return alert("All fields are required");
    onSave({ title, problem, solution, category });
    
    if (!initialData) {
      setTitle("");
      setProblem("");
      setSolution("");
      setCategory("Frontend");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`p-4 border rounded shadow-sm ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white'}`}>
      <Row className="g-3">
        
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold small">Skills Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold small">Problem Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What went wrong?"
              value={problem}
              onChange={e => setProblem(e.target.value)}
              className="shadow-sm"
              style={{ resize: 'none' }}
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold small">Solution</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="How did you fix it?"
              value={solution}
              onChange={e => setSolution(e.target.value)}
              className="shadow-sm"
              style={{ resize: 'none' }}
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold small">Category</Form.Label>
            <Form.Select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="shadow-sm"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Security">Cybersecurity</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Button 
            variant="success" 
            type="submit" 
            className="w-100 py-2 mt-2 fw-bold shadow"
          >
            <i className={`bi bi-${initialData ? 'check-all' : 'plus-circle'} me-2`}></i>
            {initialData ? "Update Changes" : "Save "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ExperimentForm;