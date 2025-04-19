import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ handleFilterChange, searchQuery, setSearchQuery, tasks }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    handleFilterChange(filterType); // Apply the filter in the parent component
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between bg-black text-white p-4 rounded-xl shadow-md space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="flex gap-4">
        <Link
          to="/TODOAPP"
          className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/add"
          className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          Add Task
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full sm:w-64 p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-4 sm:gap-2">
          <button
            onClick={() => handleFilterClick(null)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform ${
              activeFilter === null
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => handleFilterClick(true)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform ${
              activeFilter === true
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Completed Tasks
          </button>
          <button
            onClick={() => handleFilterClick(false)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform ${
              activeFilter === false
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Uncompleted Tasks
          </button>
        </div>
      </div>
    </nav>
  );
};
