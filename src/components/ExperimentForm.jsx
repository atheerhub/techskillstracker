import React, { useState, useEffect } from "react";

const ExperimentForm = ({ onSave, initialData }) => {
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
    
    // إعادة تعيين الحقول فقط في حالة الإضافة الجديدة (وليس التعديل)
    if (!initialData) {
      setTitle("");
      setProblem("");
      setSolution("");
      setCategory("Frontend");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white dark:bg-gray-800">
      <div className="d-flex flex-column gap-3">
        
        {/* حقل العنوان */}
        <div className="flex-1">
          <label className="form-label fw-bold small mb-1">Skills Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control p-2 w-full shadow-sm"
          />
        </div>

        {/* مربع المشكلة */}
        <div className="flex-1">
          <label className="form-label fw-bold small mb-1">Problem Description</label>
          <textarea
            placeholder="What went wrong?"
            value={problem}
            onChange={e => setProblem(e.target.value)}
            className="form-control p-2 w-full h-24 resize-none shadow-sm"
          />
        </div>

        {/* مربع الحل */}
        <div className="flex-1">
          <label className="form-label fw-bold small mb-1">Solution</label>
          <textarea
            placeholder="How did you fix it?"
            value={solution}
            onChange={e => setSolution(e.target.value)}
            className="form-control p-2 w-full h-24 resize-none shadow-sm"
          />
        </div>

        {/* تصنيف الخبرة */}
        <div className="flex-1">
          <label className="form-label fw-bold small mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="form-select p-2 w-full shadow-sm cursor-pointer"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Security">Cybersecurity</option>
          </select>
        </div>

        {/* زر الحفظ - عرض كامل متناسق */}
        <button 
          type="submit" 
          className="btn btn-success py-2 mt-2 fw-bold w-full shadow"
        >
          {initialData ? "Update Changes" : "Save "}
        </button>
      </div>
    </form>
  );
};

export default ExperimentForm;