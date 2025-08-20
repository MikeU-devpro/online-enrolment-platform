import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StudentEnrollmentManagement from './components/adminDashboard/StudentEnrollmentManagement';
import StudentEnrollmentDetails from './components/adminDashboard/StudentEnrollmentDetails';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardLayout from './components/adminDashboard/AdminDashboardLayout';
import AdminDashboardContent from './components/adminDashboard/AdminDashboardContent'; // Your dashboard stats page

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
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboardPage /></ProtectedRoute>} />
        
        {/* Unified Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardContent />} />
          <Route path="enrollment-management" element={<StudentEnrollmentManagement onViewDetails={handleViewDetails} />} />
          <Route path="enrollment-management/:enrollmentId" element={<StudentEnrollmentDetails onBack={handleBack} />} />
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