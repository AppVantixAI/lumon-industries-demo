import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const predefinedUsers = [
    { email: 'mark.scout@lumon.com', name: 'Mark Scout' },
    { email: 'helly.riggs@lumon.com', name: 'Helly Riggs' },
    { email: 'irving@lumon.com', name: 'Irving' },
    { email: 'dylan.george@lumon.com', name: 'Dylan George' },
    { email: 'cobel.admin@lumon.com', name: 'Harmony Cobel' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password || 'password');
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectUser = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('password'); // Set a default password
    setShowUserList(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-light tracking-wider ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>LUMON INDUSTRIES</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Employee Portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none block w-full pl-10 pr-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowUserList(!showUserList)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>▼</span>
              </button>
            </div>
            {showUserList && (
              <div className={`mt-1 absolute z-10 w-full rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <ul className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                  {predefinedUsers.map((user) => (
                    <li
                      key={user.email}
                      onClick={() => selectUser(user.email)}
                      className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${theme === 'dark' ? 'text-white hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate">{user.name}</span>
                        <span className="ml-2 text-sm text-gray-500">{user.email}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none block w-full pl-10 pr-10 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
                ) : (
                  <Eye className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
                )}
              </button>
            </div>
            <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              For demo purposes, any password will work with the predefined users.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>By signing in, you agree to the Lumon Industries employee terms and conditions.</p>
            <p className="mt-2">Remember: The work is important and mysterious.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
