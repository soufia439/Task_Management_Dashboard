import React, { useState } from 'react';
import { useTasks } from './TaskContext';

function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [notification, setNotification] = useState('');
  const [status, setStatus] = useState('Pending');
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!title) {
      setNotification('Title is required!');
      return;
    }

    // Generate a unique ID for the task
    const newTask = {
      id: Date.now(), // Simple unique ID based on timestamp
      title,
      description,
      priority,
      status
    };

    // Add the task to the global state
    addTask(newTask);
    
    // Show success notification
    setNotification('Task added successfully!');
    
    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('Pending')
    // Remove the notification after 3 seconds
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div>
      <h2>Add New Task</h2>
      {notification && <div style={{ color: 'green', marginBottom: '10px' }}>{notification}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title (required):</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        
        <div>
          <label>Priority:</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;