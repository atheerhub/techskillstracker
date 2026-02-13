import React from "react";
import { Table as BootstrapTable, Button } from "react-bootstrap";

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <BootstrapTable responsive bordered hover variant="light" className="align-middle shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Problem</th>
          <th>Solution</th>
          <th>Category</th>
          <th>Date</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((exp) => (
            <tr key={exp.id}>
              <td className="fw-bold">{exp.title}</td>
              <td>{exp.problem}</td>
              <td>{exp.solution}</td>
              <td>
                <span className="badge bg-primary rounded-pill">{exp.category}</span>
              </td>
              <td>{exp.date}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button 
                    variant="outline-warning" 
                    size="sm" 
                    onClick={() => onEdit(exp)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => onDelete(exp.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-muted">No skill logs found.</td>
          </tr>
        )}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;