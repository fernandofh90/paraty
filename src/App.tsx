import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { VisitorMap } from './pages/VisitorMap';
import { AdvertiserDashboard } from './pages/AdvertiserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdvertiserLogin } from './pages/AdvertiserLogin';
import { AdvertiserRegister } from './pages/AdvertiserRegister';
import { LanguageProvider } from './contexts/LanguageContext';
import { PlacesProvider } from './contexts/PlacesContext';

// A layout wrapper to handle distinct areas
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PlacesProvider>
      <LanguageProvider>
        <HashRouter>
          <AppLayout>
            <Routes>
              {/* Visitor Routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/map" element={<VisitorMap />} />
              
              {/* Advertiser Routes */}
              <Route path="/advertiser/login" element={<AdvertiserLogin />} />
              <Route path="/advertiser/register" element={<AdvertiserRegister />} />
              <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      </LanguageProvider>
    </PlacesProvider>
  );
};

export default App;