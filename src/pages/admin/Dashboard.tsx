import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/layouts/AdminLayout';
import Overview from './Overview';
import Customers from './Customers';
import Financial from './Financial';
import Services from './Services';
import Notifications from './Notifications';
import Settings from './Settings';
import Downloads from './Downloads';
import Plans from './Plans';
import Backgrounds from './Backgrounds';
import Support from './Support';

function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<Overview />} />
        <Route path="customers" element={<Customers />} />
        <Route path="financial" element={<Financial />} />
        <Route path="services" element={<Services />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="plans" element={<Plans />} />
        <Route path="backgrounds" element={<Backgrounds />} />
        <Route path="support" element={<Support />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminDashboard;
