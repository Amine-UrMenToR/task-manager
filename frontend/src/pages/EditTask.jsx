import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '', description: '', dueDate: '', priority: '', status: ''
  });

  useEffect(() => {
    axios.get(`/tasks`)
      .then(res => {
        const found = res.data.find(t => t.id == id);
        if (found) setTask(found);
        else navigate('/');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/tasks/${id}`, task)
      .then(() => {
        toast.success('Task updated!');
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={task.title} onChange={handleChange} required />
        <input name="description" value={task.description} onChange={handleChange} />
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
