import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/tasks', task)
      .then(() => {
        // Reset form (optional)
        setTask({
          title: '',
          description: '',
          dueDate: '',
          priority: '',
          status: ''
        });

        // Redirect to home
        navigate('/');
      })
      .catch(err => console.error('Error adding task:', err));
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="">Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="">Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
