import { Routes, Route } from 'react-router-dom';
import TaskList from '../pages/TaskList';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTask';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <TaskList />
        </ProtectedRoute>
      } />

      <Route path="/add" element={
        <ProtectedRoute>
          <AddTask />
        </ProtectedRoute>
      } />

      <Route path="/edit/:id" element={
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
