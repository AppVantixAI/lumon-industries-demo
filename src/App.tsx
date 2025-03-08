import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Login from "./components/Login";
import WorkLayout from "./layouts/WorkLayout";
import PersonalLayout from "./layouts/PersonalLayout";
import HiddenLayout from "./layouts/HiddenLayout";
import Severance from "./components/HiddenPages/Severance";
import Lumon from "./components/HiddenPages/Lumon";
import Kier from "./components/HiddenPages/Kier";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main App component
function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

// App content with access to context
function AppContent() {
  const { isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Set theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/work" replace /> : <Login />
        } />
        
        <Route path="/work/*" element={
          <ProtectedRoute>
            <WorkLayout />
          </ProtectedRoute>
        } />
        
        <Route path="/personal/*" element={
          <ProtectedRoute>
            <PersonalLayout />
          </ProtectedRoute>
        } />
        
        <Route path="/hidden/*" element={
          <ProtectedRoute>
            <HiddenLayout />
          </ProtectedRoute>
        } />
        
        <Route path="/severance" element={
          <ProtectedRoute>
            <Severance />
          </ProtectedRoute>
        } />
        
        <Route path="/lumon" element={
          <ProtectedRoute>
            <Lumon />
          </ProtectedRoute>
        } />
        
        <Route path="/kier" element={
          <ProtectedRoute>
            <Kier />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/work" replace />} />
      </Routes>
    </div>
  );
}

export default App;
