import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { User, LogOut, Sun } from 'lucide-react';
import { getRandomHiddenMessage } from '../../utils/easterEggs';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleMode } = useTheme();
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [hiddenMessage, setHiddenMessage] = useState('');

  useEffect(() => {
    // 10% chance to show a hidden message when the component mounts
    if (Math.random() < 0.1) {
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
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold tracking-wider">PERSONAL</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMode}
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label="Toggle Work Mode"
            >
              <Sun className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </button>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showHiddenMessage && (
        <div className="bg-red-900 text-white text-xs py-1 text-center opacity-80">
          {hiddenMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
