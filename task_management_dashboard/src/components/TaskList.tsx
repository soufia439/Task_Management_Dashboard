import React ,{useState}from "react";


const tasksData = [
    { id: 1, title: 'Finish React project', status: 'Pending', priority: 'High' },
    { id: 2, title: 'Go to the gym', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Read a book', status: 'Pending', priority: 'Low' },
    { id: 4, title: 'Buy groceries', status: 'Completed', priority: 'High' },
    { id: 5, title: 'Learn new React features', status: 'Pending', priority: 'Medium' }
  ];

  const TaskList:React.FC=()=> {
    const [tasks, setTasks] = useState(tasksData);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
  
    // Filter tasks based on search query and status
    const filteredTasks = tasks.filter((task) => {
      const matchesTitle = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
  
      return matchesTitle && matchesStatus;
    });
  
    return (
      <div>
        <h1>Task List</h1>
  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
  
        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', marginLeft: '10px' }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
  
        {/* Task Table */}
        <table border="1" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Title</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TaskList;