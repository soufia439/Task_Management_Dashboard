import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { TaskProvider } from './components/TaskContext';
import TaskForm from './components/TaskForm';


function App() {


  
     return (
    <TaskProvider>
      <div>
        <h1>Task Management</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App
