import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Building2, Bell, User, LogOut, Moon } from 'lucide-react';
import { getRandomHiddenMessage } from '../../utils/easterEggs';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [hiddenMessage, setHiddenMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 5% chance to show a hidden message when the component mounts
    if (Math.random() < 0.05) {
      setHiddenMessage(getRandomHiddenMessage());
      setShowHiddenMessage(true);
      
      // Hide the message after 5 seconds
      const timeout = setTimeout(() => {
        setShowHiddenMessage(false);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-900" />
            <span className="ml-2 text-xl font-semibold text-gray-900">LUMON</span>
            <div className="ml-6 text-sm text-gray-500">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            
            <button 
              onClick={toggleMode}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Toggle Personal Mode"
            >
              <Moon className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </button>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showHiddenMessage && (
        <div className="bg-blue-900 text-white text-xs py-1 text-center opacity-80">
          {hiddenMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
