import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { getPosts, deletePosts as apiDeletePost, updatePost, postPosts } from "./PostApi"; // Import all functions

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await getPosts();
      const formattedTasks = posts 
        ? Object.keys(posts).map(key => ({ id: key, ...posts[key] }))
        : [];
      setTasks(formattedTasks);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = async (id) => {
    try {
      await apiDeletePost(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
      throw err;
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      await updatePost(id, { completed }); // Update task in Firebase
      setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, completed } : task)
      );
    } catch (err) {
      setError(err.message || "Failed to update task");
      throw err;
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await postPosts(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err.message || "Failed to add task");
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const value = {
    tasks,
    loading,
    error,
    deleteTask,
    toggleTaskCompletion,
    addTask,
    refreshTasks: fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
