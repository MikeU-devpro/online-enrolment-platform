import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
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
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboardPage /></ProtectedRoute>} />
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
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