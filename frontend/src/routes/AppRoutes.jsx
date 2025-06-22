import { Routes, Route } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import AddTask from '../pages/AddTask';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/add" element={<AddTask />} />
    </Routes>
  );
}
