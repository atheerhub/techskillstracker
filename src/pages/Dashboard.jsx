import React, { useState, useEffect, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Table as BootstrapTable, Card, Button, Form, Modal } from "react-bootstrap";
import StatCard from "../components/StatCard";
import ExperimentForm from "../components/ExperimentForm";
import Profile from "../components/Profile"; 
import { initialExperiments } from "../data/experimentsData.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ currentUser, onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [view, setView] = useState("dashboard"); 
  const [skills, setSkills] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterCategory, setFilterCategory] = useState("All"); 

  const primaryGradient = "linear-gradient(135deg, #7aabbd 0%, #7ae9a8 100%)";
  const softBlue = "#7aabbd";

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem("my_skills");
    let data = saved ? JSON.parse(saved) : initialExperiments;
    
    // تأكد من أن كل مهارة لديها تاريخ (إذا لم يوجد نضع تاريخ اليوم)
    const sanitizedData = data.map(item => ({
      ...item,
      date: item.date || new Date().toLocaleDateString('en-GB'),
      category: item.category === "Security" ? "Cybersecurity" : item.category
    }));
    
    setSkills(sanitizedData);
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const term = searchQuery.toLowerCase().trim();
      const matchesSearch = s.title.toLowerCase().trim().startsWith(term);
      const matchesCategory = filterCategory === "All" || s.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, filterCategory]);

  //   Last Update بناءً على أحدث تاريخ في السجلات ---
  const stats = useMemo(() => {
    const dates = skills.map(s => s.date).filter(Boolean);
    const lastDate = dates.length > 0 ? dates[0] : new Date().toLocaleDateString('en-GB');
    
    return {
      TotalSolved: skills.length,
      TechFields: new Set(skills.map(s => s.category)).size,
      LastUpdate: lastDate,
    };
  }, [skills]);

  const chartData = useMemo(() => ({
    labels: ["Frontend", "Backend", "Database", "Cybersecurity"],
    datasets: [{
      data: [
        skills.filter(s => s.category === "Frontend").length,
        skills.filter(s => s.category === "Backend").length,
        skills.filter(s => s.category === "Database").length,
        skills.filter(s => s.category === "Cybersecurity").length,
      ],
      backgroundColor: ["#7aabbd", "#7ae9a8", "#fff019", "#ff6b6b"],
      borderWidth: 0
    }]
  }), [skills]);

  // إضافة التاريخ عند الحفظ ليظهر في التحديثات 
  const handleSave = (data) => {
    const currentDate = new Date().toLocaleDateString('en-GB');
    let updated = editingSkill 
      ? skills.map(s => s.id === editingSkill.id ? {...data, id: s.id, date: currentDate} : s)
      : [{...data, id: Date.now(), date: currentDate}, ...skills];
    
    setSkills(updated);
    localStorage.setItem("my_skills", JSON.stringify(updated));
    setShowDetailsModal(false); 
    setEditingSkill(null);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this skill log?")) {
      const updated = skills.filter(s => s.id !== id);
      setSkills(updated);
      localStorage.setItem("my_skills", JSON.stringify(updated));
      setShowDetailsModal(false);
    }
  };

  return (
    <div className={`d-flex ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{ minHeight: "100vh", transition: "0.3s", width: "100vw", overflowX: "hidden" }}>
      
      <aside style={{ 
        width: isSidebarOpen ? "260px" : "0px", 
        minWidth: isSidebarOpen ? "260px" : "0px",
        transition: "all 0.3s ease", 
        background: darkMode ? "#1a1d20" : primaryGradient, 
        minHeight: "100vh", 
        overflow: "hidden",
        zIndex: 1000
      }}>
        <div className="p-4 text-white" style={{ width: "260px" }}>
          <h4 className="fw-bold mb-5" style={{ fontSize: '1.1rem' }}>
            <i className="bi bi-cpu-fill me-2"></i>TECH SKILLS TRACKER
          </h4>
          <nav className="nav flex-column gap-2">
            <Button variant="link" className={`text-white text-start text-decoration-none p-3 rounded-3 shadow-none ${view === 'dashboard' ? 'bg-white bg-opacity-25 fw-bold' : ''}`} onClick={() => setView("dashboard")}><i className="bi bi-speedometer2 me-2"></i> Dashboard</Button>
            <Button variant="link" className={`text-white text-start text-decoration-none p-3 rounded-3 shadow-none ${view === 'analytics' ? 'bg-white bg-opacity-25 fw-bold' : ''}`} onClick={() => setView("analytics")}><i className="bi bi-graph-up-arrow me-2"></i> Analytics</Button>
            <Button variant="link" className={`text-white text-start text-decoration-none p-3 rounded-3 shadow-none ${view === 'skills' ? 'bg-white bg-opacity-25 fw-bold' : ''}`} onClick={() => setView("skills")}><i className="bi bi-journal-code me-2"></i> Skill Logs</Button>
            <Button variant="link" className={`text-white text-start text-decoration-none p-3 rounded-3 shadow-none ${view === 'profile' ? 'bg-white bg-opacity-25 fw-bold' : ''}`} onClick={() => setView("profile")}><i className="bi bi-person-circle me-2"></i> Profile</Button>
            <hr className="opacity-25"/>
            <Button variant="link" className="text-white text-start text-decoration-none shadow-none" onClick={() => setDarkMode(!darkMode)}>
              <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-stars-fill'} me-2`}></i> {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="link" className="text-white text-start text-decoration-none text-danger fw-bold shadow-none" onClick={onLogout}><i className="bi bi-box-arrow-left me-2"></i> Logout</Button>
          </nav>
        </div>
      </aside>

      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <header className={`p-3 d-flex align-items-center shadow-sm border-bottom ${darkMode ? "bg-dark border-secondary" : "bg-white"}`}>
          <Button variant={darkMode ? "outline-light" : "light"} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="me-3 border shadow-none"><i className="bi bi-list"></i></Button>
          <h5 className="m-0 fw-bold text-uppercase" style={{ color: darkMode ? "#7ae9a8" : softBlue }}>
            {view === 'skills' ? 'Skill Logs' : view}
          </h5>
        </header>

        <main className="p-4 flex-grow-1">
          {view === "dashboard" && (
            <div className="animate__animated animate__fadeIn">
              <div className="mb-5 p-5 rounded-4 shadow-sm text-white d-flex justify-content-between align-items-center" style={{ background: primaryGradient }}>
                <div><h1 className="fw-bold">Welcome, {currentUser.name}!</h1><p className="fs-5 opacity-75">Ready to log some new skills?</p></div>
                <i className="bi bi-rocket-takeoff-fill d-none d-md-block" style={{ fontSize: "5rem", opacity: "0.3" }}></i>
              </div>
              <div className="row g-4 text-center">
                <div className="col-md-4"><StatCard title="Total Skills" count={stats.TotalSolved} icon={<i className="bi bi-award text-primary fs-3"></i>} dark={darkMode} /></div>
                <div className="col-md-4"><StatCard title="Tech Fields" count={stats.TechFields} icon={<i className="bi bi-layers text-success fs-3"></i>} dark={darkMode} /></div>
                <div className="col-md-4"><StatCard title="Last Update" count={stats.LastUpdate} icon={<i className="bi bi-calendar-check text-warning fs-3"></i>} dark={darkMode} /></div>
              </div>
            </div>
          )}

          {view === "analytics" && (
            <Card className={`p-4 border-0 shadow-sm rounded-4 text-center animate__animated animate__fadeInUp ${darkMode ? "bg-secondary text-white" : "bg-white"}`}>
              <h5 className="fw-bold mb-4">Skills Distribution</h5>
              <div style={{ height: '350px' }} className="d-flex justify-content-center">
                <Pie data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: darkMode ? '#fff' : '#666' } } } }} />
              </div>
            </Card>
          )}

          {view === "skills" && (
            <div className="animate__animated animate__fadeIn">
              <Card className={`p-4 mb-4 border-0 shadow-sm rounded-4 ${darkMode ? "bg-secondary text-white" : "bg-white"}`}>
                <h5 className="fw-bold mb-3"><i className="bi bi-plus-circle me-2"></i>Add New Skill Log</h5>
                <ExperimentForm onSave={handleSave} />
              </Card>

              <div className="row g-2 mb-4">
                <div className="col-md-8">
                  <Form.Control type="text" placeholder="Search by title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`border-0 shadow-sm p-3 rounded-3 ${darkMode ? "bg-dark text-white shadow-none" : "bg-white"}`} />
                </div>
                <div className="col-md-4">
                  <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={`border-0 shadow-sm p-3 rounded-3 ${darkMode ? "bg-dark text-white shadow-none" : "bg-white"}`}>
                    <option value="All">All Categories</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </Form.Select>
                </div>
              </div>

              <BootstrapTable responsive borderless hover variant={darkMode ? "dark" : "light"} className="shadow-sm rounded-4 overflow-hidden">
                <thead style={{ background: primaryGradient }} className="text-white">
                  <tr><th>Skill Topic</th><th>Category</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filteredSkills.map(skill => (
                    <tr key={skill.id} className="align-middle">
                      <td className="fw-bold">{skill.title}</td>
                      <td>
                        <span 
                          className={`badge rounded-pill px-3 ${darkMode ? "bg-dark text-info border border-info" : "bg-light text-primary border"}`}
                          style={{ minWidth: "120px", display: "inline-block", textAlign: "center" }}
                        >
                          {skill.category}
                        </span>
                      </td>
                      <td><Button size="sm" style={{backgroundColor: softBlue, border: 0}} onClick={() => {setSelectedSkill(skill); setEditingSkill(null); setShowDetailsModal(true);}}><i className="bi bi-eye"></i> Details</Button></td>
                    </tr>
                  ))}
                </tbody>
              </BootstrapTable>
            </div>
          )}

          {view === "profile" && <Profile currentUser={currentUser} />}
        </main>
      </div>

      <Modal show={showDetailsModal} onHide={() => {setShowDetailsModal(false); setEditingSkill(null);}} centered>
        <Modal.Header closeButton style={{ background: primaryGradient }} className="text-white border-0">
          <Modal.Title>{editingSkill ? "Edit Skill Log" : "Skill Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`p-4 ${darkMode ? "bg-dark text-white" : "bg-white"}`}>
          {editingSkill ? (
            <ExperimentForm onSave={handleSave} initialData={editingSkill} onCancel={() => setEditingSkill(null)} />
          ) : (
            <>
              <h4 style={{color: softBlue}} className="fw-bold">{selectedSkill?.title}</h4>
              <hr className={darkMode ? "border-secondary" : ""}/>
              <p><strong>Problem:</strong> {selectedSkill?.problem}</p>
              <p><strong>Solution:</strong> {selectedSkill?.solution}</p>
              <div className="d-flex gap-2 mt-4">
                <Button variant="outline-warning" className="flex-grow-1" onClick={() => setEditingSkill(selectedSkill)}><i className="bi bi-pencil-square"></i> Edit</Button>
                <Button variant="outline-danger" className="flex-grow-1" onClick={() => handleDelete(selectedSkill.id)}><i className="bi bi-trash"></i> Delete</Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;