import React, { useState } from "react";

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

    setSkills([
      ...skills,
      { ...form, id: Date.now() },
    ]);

    setForm({
      title: "",
      category: "Frontend",
      problem: "",
      level: "Beginner",
    });
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Skill Records</h2>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <input
          className="p-2 border rounded w-full"
          placeholder="Search by title or problem"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>Cyber Security</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded border">
        <div className="grid grid-cols-5 font-bold border-b pb-2 mb-2">
          <span>Title</span>
          <span>Category</span>
          <span>Problem</span>
          <span>Level</span>
          <span>Action</span>
        </div>

        {filteredSkills.map((skill) => (
          <div key={skill.id} className="grid grid-cols-5 py-2 border-b text-sm">
            <span>{skill.title}</span>
            <span>{skill.category}</span>
            <span>{skill.problem}</span>
            <span>{skill.level}</span>
            <button
              onClick={() => handleDelete(skill.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Skill */}
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-4 rounded border space-y-3">
        <h3 className="font-bold">Add New Skill</h3>

        <input
          className="w-full p-2 border rounded"
          placeholder="Skill Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Problem Faced"
          value={form.problem}
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
        />

        <div className="flex gap-4">
          <select
            className="p-2 border rounded w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Cyber Security</option>
          </select>

          <select
            className="p-2 border rounded w-full"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default Records;