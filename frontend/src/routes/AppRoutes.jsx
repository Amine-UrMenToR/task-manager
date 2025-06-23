import { Routes, Route } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTask';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  );
}
