import React, { createContext, useState, useContext } from 'react';

// Create Context for Task List
const TaskContext = createContext();

// Provider component that holds the task list
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  // Add a new task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

   // Update the task status
   const updateTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };
// Delete a task
const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
};
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus ,deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
export const useTasks = () => {
  return useContext(TaskContext);
};