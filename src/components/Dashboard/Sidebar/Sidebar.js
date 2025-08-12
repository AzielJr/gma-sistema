import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, activeModule, onModuleChange }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: '🏠',
      action: () => onModuleChange('dashboard')
    },
    {
      key: 'cadastros',
      title: 'Cadastros',
      icon: '📋',
      submenu: [
        {
          key: 'tabelas-referencia',
          title: 'Tabelas de Referência',
          submenu: [
            { key: 'nucleos', title: 'Núcleos' },
            { key: 'bairros', title: 'Bairros' },
            { key: 'cidades', title: 'Cidades' },
            { key: 'nacionalidades', title: 'Nacionalidades' },
            { key: 'profissoes', title: 'Profissões' },
            { key: 'situacao-cadastral', title: 'Situação Cadastral' },
            { key: 'situacao-funcional', title: 'Situação Funcional' },
            { key: 'setores-funcional', title: 'Setores Funcional' },
            { key: 'departamentos', title: 'Departamentos' },
            { key: 'grau-instrucao', title: 'Grau de Instrução' },
            { key: 'tipo-enquadramento', title: 'Tipo de Enquadramento' },
            { key: 'classificacao-enquadramento', title: 'Classificação de Enquadramento' },
            { key: 'orgaos-referencia', title: 'Órgãos de Referência' },
            { key: 'unidade-medida', title: 'Unidade de Medida' },
            { key: 'orgao-especialidades', title: 'Órgão de Especialidades' },
            { key: 'diretrizes', title: 'Diretrizes' },
            { key: 'projetos', title: 'Projetos' },
            { key: 'documentacao-basica', title: 'Documentação Básica' },
            { key: 'documentacao-tecnica', title: 'Documentação Técnica' },
            { key: 'tipo-logradouros', title: 'Tipo de Logradouros' },
            { key: 'atividades-cnae', title: 'Atividades CNAE' },
            { key: 'instituicoes-formacao', title: 'Instituições de Formação' },
            { key: 'tipos-documentos', title: 'Tipos de Documentos' },
            { key: 'status-processo', title: 'Status de Processo' },
            { key: 'prazos-validacao', title: 'Prazos de Validação' },
            { key: 'tipos-licenca', title: 'Tipos de Licença' },
            { key: 'pareamento-leis', title: 'Pareamento das Leis' },
            { key: 'grau-poluidor', title: 'Grau Poluidor' },
            { key: 'area-empreendimento', title: 'Área do Empreendimento' },
            { key: 'investimento-ufm', title: 'Investimento em UFM' },
            { key: 'texto-padrao', title: 'Texto Padrão' },
            { key: 'quadro-funcional', title: 'Quadro Funcional' },
            { key: 'faixa-licenciamento', title: 'Faixa de Licenciamento Municipal' }
          ]
        },
        { key: 'indexadores', title: 'Indexadores' },
        { key: 'contribuintes', title: 'Contribuintes' },
        { key: 'roteiro-orientativo', title: 'Roteiro Orientativo' },
        { key: 'tecnicos-ambientais', title: 'Técnicos Ambientais' },
        { key: 'atividade-secundaria', title: 'Atividade Secundária' }
      ]
    },
    {
      key: 'tramite',
      title: 'Trâmite',
      icon: '📄',
      submenu: [
        { key: 'abertura-processo', title: 'Abertura de Processo' },
        { key: 'protocolo-padrao', title: 'Protocolo Padrão' },
        { key: 'protocolo-livre', title: 'Protocolo Livre' },
        { key: 'enquadramento', title: 'Enquadramento' },
        { key: 'dam', title: 'DAM' }
      ]
    },
    {
      key: 'consultas',
      title: 'Consultas',
      icon: '🔍',
      submenu: [
        { key: 'consulta-roteiro', title: 'Roteiro Orientativo' },
        { key: 'consulta-processos', title: 'Processos' }
      ]
    },
    {
      key: 'impressoes',
      title: 'Impressões',
      icon: '🖨️',
      submenu: [
        { key: 'impressao-processo', title: 'Processo' },
        { key: 'impressao-licenca', title: 'Licença' }
      ]
    },
    {
      key: 'utilidades',
      title: 'Utilidades',
      icon: '⚙️',
      submenu: [
        { key: 'preferencias', title: 'Preferências' },
        { key: 'usuarios', title: 'Usuários' },
        { key: 'niveis-acesso', title: 'Níveis de Acesso' }
      ]
    }
  ];

  const renderMenuItem = (item, level = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus[item.key];
    const isActive = activeModule === item.key;

    return (
      <div key={item.key} className={`menu-item level-${level}`}>
        <div 
          className={`menu-item-header ${isActive ? 'active' : ''}`}
          onClick={() => {
            if (hasSubmenu) {
              toggleSubmenu(item.key);
            } else {
              onModuleChange(item.key);
            }
          }}
        >
          {level === 0 && <span className="menu-icon">{item.icon}</span>}
          <span className="menu-title">{item.title}</span>
          {hasSubmenu && (
            <span className={`menu-arrow ${isExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          )}
        </div>
        
        {hasSubmenu && isExpanded && (
          <div className="submenu">
            {item.submenu.map(subItem => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="logout-sidebar-btn"
            onClick={() => onModuleChange('logout')}
          >
            <span className="menu-icon">🚪</span>
            <span className="menu-title">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;