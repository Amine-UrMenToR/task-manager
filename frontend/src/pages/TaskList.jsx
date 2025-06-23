import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            {' '}
            <Link to={`/edit/${task.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
