import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

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
    if (confirm('Are you sure you want to delete this task?')) {
      axios.delete(`/tasks/${id}`)
        .then(() => {
          toast.success('Task deleted!');
          setTasks(tasks.filter(task => task.id !== id)); // Update list without re-fetching
        })
        .catch(err => {
          toast.error('Failed to delete task');
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            {' '}
            <Link to={`/edit/${task.id}`}>Edit</Link>
            {' '}
            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '8px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
