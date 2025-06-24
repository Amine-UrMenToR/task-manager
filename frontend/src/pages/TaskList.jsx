// src/pages/TaskList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import '../index.css';      // if your global styles live here
import './TaskList.css';    // new file for table-specific styles

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    axios.delete(`/tasks/${id}`)
      .then(() => {
        toast.success('Task deleted!');
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(() => toast.error('Failed to delete task'));
  };

  return (
    <main className="container">
      <div className="task-list-header">
        <h2>All Tasks</h2>
        <Link to="/add">
          <button className="add-task-btn">+ Add Task</button>
        </Link>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.dueDate || '—'}</td>
              <td>{t.priority}</td>
              <td className="task-actions">
                <Link to={`/edit/${t.id}`} className="action-link">Edit</Link>
                <button onClick={() => handleDelete(t.id)} className="action-btn delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
