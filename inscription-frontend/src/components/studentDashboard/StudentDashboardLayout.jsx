import React from 'react';
import DashboardSidebar from '../dashboard/DashboardSidebar.jsx';
import DashboardHeader from '../dashboard/DashboardHeader.jsx';

const StudentDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          pageTitle="Tableau de bord"
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;