import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you're importing useNavigate correctly
import { useTasks } from '../services/taskDataContext';
import { postPosts } from '../services/PostApi';
import { FaHome } from 'react-icons/fa';

export const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    completed: false
  });
  const [loading, setLoading] = useState(false);

  const { tasks, addTask } = useTasks(); // Use addTask from context to add tasks
  const navigate = useNavigate(); // Correctly initialize the navigate function

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      title: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the task title is blank
    if (!taskData.title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    setLoading(true); // Disable button while loading
    try {
      await addTask(taskData); // Use the addTask function from context
      setTaskData({ title: "", completed: false }); // Clear the form

      // Wait a little to ensure the task is added before redirecting
      setTimeout(() => {
        navigate('/'); // Redirect to homepage after successful task addition
      }, 300); // Adjust timeout duration if necessary
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false); // Re-enable the button once the task is added or an error occurs
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      {/* Header with Home Button */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        <Link to="/" className="text-white hover:text-indigo-500 transition">
          <FaHome className="text-3xl sm:text-4xl" />
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 text-center">PRODUCTIIBE</h1>
      </div>

      {/* Task Form Section */}
      <div className="max-w-2xl mx-auto bg-gray-800 text-white shadow-xl rounded-xl p-6 mt-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task" className="block text-xl font-medium">Task:</label>
            <input
              type="text"
              name="task"
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-600 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
              placeholder="Enter your task here"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 transition duration-300 ease-in-out cursor-pointer ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">⏳ Adding...</span>
            ) : (
              "Add Your Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
