import React from 'react';
import { Outlet } from 'react-router-dom';

const HiddenLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default HiddenLayout;
