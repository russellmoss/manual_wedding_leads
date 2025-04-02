import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../../pages/dashboard/DashboardHome';
import Analytics from '../../pages/dashboard/Analytics';
import Feedback from '../../pages/dashboard/Feedback';
import Settings from '../../pages/dashboard/Settings';
import Profile from '../../pages/dashboard/Profile';
import ProtectedRoute from '../auth/ProtectedRoute';

const DashboardRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default DashboardRoutes; 