import React from 'react';
import { Languages, User, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenu = false }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();

  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'ar' as const, name: 'العربية' },
    { code: 'fr' as const, name: 'Français' },
    { code: 'tr' as const, name: 'Türkçe' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-600 hover:text-healux-primary hover:bg-gray-100 transition-colors md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-healux-primary to-healux-secondary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">H</span>
              </div>
              <span className="ml-2 rtl:ml-0 rtl:mr-2 text-xl font-bold text-gray-900">
                HealuX
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 text-gray-700 hover:text-healux-primary transition-colors">
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === language)?.name}
                </span>
              </button>
              <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`block w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        language === lang.code ? 'text-healux-primary bg-healux-light' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* User Menu */}
            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-gray-700 hover:text-healux-primary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{user.name}</span>
                </button>
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      {t('profile')}
                    </button>
                    <button className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      {t('bookings')}
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {t('logout')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};