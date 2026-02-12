import React from "react";

const Sidebar = ({ view, setView, darkMode, setDarkMode, onLogout }) => {
  return (
    <aside className={`w-64 p-6 border-r ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}>
      <h2 className="text-xl font-bold mb-6">Tech Skill Tracker</h2>
      <nav className="flex flex-col gap-2">
        <button 
          onClick={() => setView("stats")} 
          className={`p-2 rounded font-bold ${view==='stats' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Stats
        </button>
        <button 
          onClick={() => setView("list")} 
          className={`p-2 rounded font-bold ${view==='list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Experiments
        </button>
        <button 
          onClick={() => setView("profile")} 
          className={`p-2 rounded font-bold ${view==='profile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Profile
        </button>
      </nav>
      <div className="mt-6 space-y-2">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="w-full p-2 rounded border"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button 
          onClick={onLogout} 
          className="w-full p-2 rounded border text-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;