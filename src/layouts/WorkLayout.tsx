import React, { useState } from 'react';
import Header from '../components/WorkMode/Header';
import Sidebar from '../components/WorkMode/Sidebar';
import Dashboard from '../components/WorkMode/Dashboard';

const WorkLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default WorkLayout;
