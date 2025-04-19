import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { TasksProvider } from './services/taskDataContext'; // Corrected provider name
import './App.css';

function App() {
  return (
    <TasksProvider>
      <AppRoutes />
    </TasksProvider>
  );
}

export default App;
