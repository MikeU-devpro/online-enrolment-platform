import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import CourseDashboard from '../components/dashboard/CourseDashboard';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <CourseDashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;