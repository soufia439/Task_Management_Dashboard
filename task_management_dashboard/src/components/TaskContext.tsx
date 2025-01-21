import React, { createContext, useState, useContext ,useEffect } from 'react';

// Create Context for Task List
const TaskContext = createContext();

// Provider component that holds the task list
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for fetching tasks

   // Fetch tasks from JSONPlaceholder API
   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        // Add a status and priority to match our previous format
        const formattedTasks = data.map(task => ({
          id: task.id,
          title: task.title,
          description: '', // JSONPlaceholder doesn't provide a description field
          priority: 'Low', // Default priority for all tasks
          status: task.completed ? 'Completed' : 'Pending', // Mark as completed based on the API data
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);  // Hide loader after tasks are fetched
      }
    };

    fetchTasks();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

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