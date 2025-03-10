import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/PersonalMode/Header';

const PersonalLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PersonalLayout;
