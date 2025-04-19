import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaTrash, FaSpinner, FaCheck } from 'react-icons/fa';
import { Navbar } from '../components/Navbar';
import { useTasks } from '../services/taskDataContext';

export const Home = () => {
  const { tasks, loading, error, deleteTask, toggleTaskCompletion, refreshTasks } = useTasks();
  const [filter, setFilter] = useState(null); // All tasks, completed tasks, uncompleted tasks
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleFilterChange = (filterType) => {
    setFilter(filterType); // Set the active filter state
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === null || task.completed === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={refreshTasks}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry Loading Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <Link to="/TODOAPP" className="text-white hover:text-indigo-500 transition">
          <FaHome className="text-3xl sm:text-4xl" />
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 text-center flex-grow">PRODUCTIIBE</h1>
        <Link to="/add" className="text-white hover:text-indigo-500 transition">
          <FaPlus className="text-3xl sm:text-4xl" />
        </Link>
      </div>

      <Navbar
        handleFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tasks={tasks}
      />

      {filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center h-full text-xl text-gray-400">
          No tasks available.
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${task.completed ? 'bg-green-500' : 'bg-gray-600'}`}
                  onClick={() => toggleTaskCompletion(task.id, !task.completed)}
                >
                  {task.completed && <FaCheck className="text-white" />}
                </button>
                <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                disabled={deletingId === task.id}
                className="text-red-500 hover:text-red-700 disabled:text-gray-400"
              >
                {deletingId === task.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
