import React from "react";

const Header = ({ userName }) => (
  <header className="p-6 border-b flex justify-between items-center bg-white dark:bg-gray-800">
    <h1 className="text-xl font-bold">Welcome, {userName}</h1>
  </header>
);

export default Header;