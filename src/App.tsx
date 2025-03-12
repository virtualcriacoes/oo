import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ClientDashboard from './pages/client/Dashboard';

function App() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Panel Routes - Updated to use nested routing */}
        <Route 
          path="/administrador/*" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Client Panel Routes */}
        <Route 
          path="/cliente/*" 
          element={
            isAuthenticated && user?.role === 'client' ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Default Route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? <Navigate to="/administrador" replace /> : <Navigate to="/cliente" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
