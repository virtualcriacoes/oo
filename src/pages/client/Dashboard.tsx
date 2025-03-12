import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import ClientLayout from '../../components/layouts/ClientLayout';
import ClientOverview from './Overview';
import Downloads from './Downloads';
import Invoices from './Invoices';
import Plans from './Plans';
import Referrals from './Referrals';
import Backgrounds from './Backgrounds';
import Support from './Support';
import Notifications from './Notifications';

function ClientDashboard() {
  return (
    <ClientLayout>
      <Routes>
        <Route path="" element={<ClientOverview />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="plans" element={<Plans />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="backgrounds" element={<Backgrounds />} />
        <Route path="support" element={<Support />} />
        <Route path="notifications" element={<Notifications />} />
      </Routes>
      <Outlet />
    </ClientLayout>
  );
}

export default ClientDashboard;
