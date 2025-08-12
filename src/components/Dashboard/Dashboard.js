import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModuleChange = (module) => {
    setActiveModule(module);
  };

  return (
    <div className="dashboard">
      <Header 
        user={user}
        onLogout={onLogout}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="dashboard-body">
        <Sidebar 
          isOpen={sidebarOpen}
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
        />
        
        <MainContent 
          activeModule={activeModule}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;