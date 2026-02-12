import React from "react";

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="border p-2">Title</th>
          <th className="border p-2">Problem</th>
          <th className="border p-2">Solution</th> {/* تم إضافة Solution */}
          <th className="border p-2">Category</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((exp) => (
          <tr key={exp.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <td className="border p-2">{exp.title}</td>
            <td className="border p-2">{exp.problem}</td>
            <td className="border p-2">{exp.solution}</td> {/* تم إضافة Solution */}
            <td className="border p-2">{exp.category}</td>
            <td className="border p-2">{exp.date}</td>
            <td className="border p-2 flex gap-2">
              <button
                onClick={() => onEdit(exp)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(exp.id)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;