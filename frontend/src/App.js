// src/App.js

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Loader from './components/Loader'; // Re-import if you deleted it, or I can provide the code again
import PageLoader from './components/PageLoader';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterRolePage from './pages/RegisterRolePage';
import RegisterOrgPage from './pages/RegisterOrgPage';
import RegisterUserPage from './pages/RegisterUserPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ResidentManagementPage from './pages/ResidentManagementPage';
import CreateComplaintPage from './pages/CreateComplaintPage';
import ProfilePage from './pages/ProfilePage';
import CommunityBoardPage from './pages/CommunityBoardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import ContactSupportPage from './pages/ContactSupportPage';
import AdminAnnouncementsPage from './pages/AdminAnnouncementsPage';
import UserAnnouncementsPage from './pages/UserAnnouncementsPage';

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AppContent = () => {
  const { isPageLoading, setPageLoading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, setPageLoading]);

  return (
    <>
      {isPageLoading && <PageLoader />}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/contact" element={<ContactSupportPage />} />
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterRolePage />} />
            <Route path="/register/organization" element={<RegisterOrgPage />} />
            <Route path="/register/user" element={<RegisterUserPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-complaint" element={<CreateComplaintPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/community-board" element={<CommunityBoardPage />} />
            <Route path="/announcements" element={<UserAnnouncementsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/residents" element={<ResidentManagementPage />} />
            <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;