import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Dashboard Imports
import AdminDashboardLayout from './components/adminDashboard/AdminDashboardLayout';
import AdminDashboardContent from './components/adminDashboard/AdminDashboardContent';
import StudentEnrollmentManagement from './components/adminDashboard/StudentEnrollmentManagement';
import StudentEnrollmentDetails from './components/adminDashboard/StudentEnrollmentDetails';
import ProgramManagement from './components/adminDashboard/ProgramManagement';
import ProgramForm from './components/adminDashboard/ProgramForm';
import UserManagement from './components/adminDashboard/UserManagement';
import UserForm from './components/adminDashboard/UserForm';
import AdminFAQ from './components/adminDashboard/AdminFAQ'; // New import
import AdminHelp from './components/adminDashboard/AdminHelp'; // New import

// Student Dashboard Imports
import StudentDashboardLayout from './components/studentDashboard/StudentDashboardLayout';
import StudentDashboardContent from './components/studentDashboard/StudentDashboardContent';
import StudentFAQ from './components/studentDashboard/StudentFAQ'; // New import
import StudentHelp from './components/studentDashboard/StudentHelp'; // New import


function App() {
    const navigate = useNavigate();

    const handleViewDetails = (enrollment) => {
        navigate(`/admin-dashboard/enrollment-management/${enrollment.id}`, { state: { enrollment } });
    };

    const handleBack = () => {
        navigate('/admin-dashboard/enrollment-management');
    };

    return (
        <div className="App flex flex-col min-h-screen">
            <Routes>
                <Route element={<AppLayoutWithHeaderFooter />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                </Route>
                
                {/* Student Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboardLayout /></ProtectedRoute>}>
                    <Route index element={<StudentDashboardContent />} />
                    <Route path="messages" element={<div>Messagerie pour étudiant</div>} /> {/* Placeholder */}
                    <Route path="settings" element={<div>Paramètres pour étudiant</div>} /> {/* Placeholder */}
                    <Route path="faq" element={<StudentFAQ />} />
                    <Route path="help" element={<StudentHelp />} />
                </Route>
                
                {/* Admin Dashboard Routes */}
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout /></ProtectedRoute>}>
                    <Route index element={<AdminDashboardContent />} />
                    <Route path="enrollment-management" element={<StudentEnrollmentManagement onViewDetails={handleViewDetails} />} />
                    <Route path="enrollment-management/:enrollmentId" element={<StudentEnrollmentDetails onBack={handleBack} />} />
                    <Route path="program-management" element={<ProgramManagement />} />
                    <Route path="program-management/add" element={<ProgramForm />} />
                    <Route path="program-management/edit/:id" element={<ProgramForm />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="user-management/add" element={<UserForm />} />
                    <Route path="user-management/edit/:id" element={<UserForm />} />
                    <Route path="messages" element={<div>Messagerie pour administrateur</div>} />
                    <Route path="settings" element={<div>Paramètres pour administrateur</div>} />
                    <Route path="faq" element={<AdminFAQ />} />
                    <Route path="help" element={<AdminHelp />} />
                </Route>
            </Routes>
        </div>
    );
}

const AppLayoutWithHeaderFooter = () => (
    <>
        <AppHeader />
        <main className="flex-1 overflow-auto">
            <Outlet />
        </main>
        <AppFooter />
    </>
);

export default App;