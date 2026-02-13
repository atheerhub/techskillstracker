import React, { useState } from "react";
import { Table, Button, Form, Card, Row, Col } from "react-bootstrap";

const Records = ({ skills, setSkills }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [form, setForm] = useState({
    title: "",
    category: "Frontend",
    problem: "",
    level: "Beginner",
  });

  const filteredSkills = skills.filter(
    (skill) =>
      (category === "All" || skill.category === category) &&
      (skill.title.toLowerCase().includes(search.toLowerCase()) ||
        skill.problem.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.problem) return;

    setSkills([...skills, { ...form, id: Date.now() }]);
    setForm({ title: "", category: "Frontend", problem: "", level: "Beginner" });
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure?")) {
        setSkills(skills.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">Skill Records</h2>

      {/* Search & Filter */}
      <Row className="g-3 mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by title or problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shadow-sm"
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow-sm"
          >
            <option value="All">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Cyber Security">Cyber Security</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table Section */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Problem</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="align-middle">
                  <td className="fw-bold">{skill.title}</td>
                  <td><span className="badge bg-info text-dark">{skill.category}</span></td>
                  <td>{skill.problem}</td>
                  <td>{skill.level}</td>
                  <td>
                    <Button 
                      variant="link" 
                      className="text-danger p-0 shadow-none" 
                      onClick={() => handleDelete(skill.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Skill Form Section */}
      <Card className="shadow-sm border-0 bg-light">
        <Card.Body className="p-4">
          <h3 className="h5 fw-bold mb-3">Add New Skill</h3>
          <Form onSubmit={handleAdd}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Skill Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>Cyber Security</option>
                </Form.Select>
              </Col>
              <Col md={12}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Problem Faced"
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </Form.Select>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  <i className="bi bi-plus-circle me-2"></i> Add Skill
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Records;