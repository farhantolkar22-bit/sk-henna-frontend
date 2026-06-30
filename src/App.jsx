import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ConesPage from './pages/ConesPage';
import BookingPage from './pages/BookingPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const [config, setConfig] = useState(null);
  const [userRole, setUserRole] = useState(() => sessionStorage.getItem('userRole') || null);
  const [quantities, setQuantities] = useState({
    nailCone: 0,
    normalCone: 0,
    bridalCone: 0,
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error('Failed to load config from backend:', err));
  }, []);

  // Sync authentication role state on path/route changes
  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole') || null);
  }, [location]);

  const isAuthRoute = location.pathname === '/admin' || location.pathname === '/login' || location.pathname === '/admin-login';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        {!isAuthRoute && <Navbar userRole={userRole} />}
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/cones" 
            element={
              <ConesPage 
                quantities={quantities} 
                setQuantities={setQuantities} 
                config={config} 
              />
            } 
          />
          
          <Route 
            path="/booking" 
            element={<BookingPage config={config} />} 
          />
          
          <Route 
            path="/gallery" 
            element={<GalleryPage />} 
          />
          
          <Route 
            path="/contact" 
            element={<ContactPage config={config} />} 
          />
          
          <Route 
            path="/login" 
            element={
              <GoogleOAuthProvider clientId={config?.googleClientId || "dummy-id.apps.googleusercontent.com"}>
                <LoginPage onLoginSuccess={(role) => setUserRole(role)} googleClientId={config?.googleClientId || null} />
              </GoogleOAuthProvider>
            } 
          />

          <Route 
            path="/admin-login" 
            element={<AdminLoginPage onLoginSuccess={(role) => setUserRole(role)} />} 
          />
          
          <Route 
            path="/admin" 
            element={<AdminDashboard />} 
          />
        </Routes>
      </div>
      {!isAuthRoute && <Footer config={config} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
