import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import DashboardHeader from '../dashboard/DashboardHeader';

const AdminDashboardLayout = () => {
    return (
        <div className="flex h-screen bg-white">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader
                    pageTitle="Tableau de bord - Admin"
                />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;