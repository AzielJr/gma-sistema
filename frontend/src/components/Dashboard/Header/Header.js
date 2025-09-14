import React from 'react';
import './Header.css';

const Header = ({ user, onLogout, toggleSidebar, sidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          title={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={`hamburger ${sidebarOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <div className="header-logo">
          <img src="/img/gma.png" alt="GMA" className="gma-logo" />
          <div className="header-title">
            <h1>GMA</h1>
            <span>Sistema de Gestão em Meio Ambiente</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="prefeitura-info">
          <div className="prefeitura-logo">
            {/* Espaço para logo da prefeitura */}
            <div className="prefeitura-placeholder">
              LOGO PREFEITURA
            </div>
          </div>
          <div className="prefeitura-name">
            <h2>Prefeitura Municipal</h2>
            <span>Secretaria de Meio Ambiente</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">
            <span>{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || 'Usuário'}</span>
            <span className="user-role">{user?.role || 'Usuário'}</span>
          </div>
        </div>
        
        <button 
          className="logout-btn"
          onClick={onLogout}
          title="Sair do sistema"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;