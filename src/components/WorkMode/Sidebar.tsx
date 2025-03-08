import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  FileText, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: <Home size={18} />, label: 'Dashboard', active: true },
    { icon: <FileText size={18} />, label: 'Documents', active: false },
    { icon: <Calendar size={18} />, label: 'Schedule', active: false },
    { icon: <Users size={18} />, label: 'Department', active: false },
    { icon: <MessageSquare size={18} />, label: 'Messages', active: false },
    { icon: <Settings size={18} />, label: 'Settings', active: false },
    { icon: <HelpCircle size={18} />, label: 'Support', active: false },
  ];

  return (
    <div className="h-full w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <div className="text-sm font-medium text-gray-700">Employee Status</div>
          <div className="text-xs text-gray-500 mt-1">{user?.department}</div>
          <div className="flex items-center mt-2">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-600">Active</span>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                item.active 
                  ? 'bg-blue-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <AlertTriangle size={14} className="mr-2 text-amber-500" />
          <span>Security Level: {user?.accessLevel || 0}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Last login: Today, 08:42 AM
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
