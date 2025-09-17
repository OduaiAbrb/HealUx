import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MedicalBookingPage } from './pages/MedicalBookingPage';

type CurrentPage = 'home' | 'medical' | 'recovery' | 'tourism' | 'transport' | 'support';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const handleServiceSelect = (service: string) => {
    setCurrentPage(service as CurrentPage);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'medical':
        return <MedicalBookingPage onBack={handleBackToHome} />;
      case 'home':
      default:
        return <HomePage onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          {renderCurrentPage()}
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;