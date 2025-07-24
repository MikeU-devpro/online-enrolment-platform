import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children }) => {

    const userName = "Student Name";
    const userEmail = "student@example.com";

    return (
        <div className="flex h-screen bg-gray-100">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader
                    pageTitle="Tableau de bord"
                    userName={userName}
                    userEmail={userEmail}
                />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;