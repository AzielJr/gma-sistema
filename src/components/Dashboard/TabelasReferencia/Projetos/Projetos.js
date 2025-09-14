import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Projetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [filteredProjetos, setFilteredProjetos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    responsavel: '',
    status: '',
    ativo: true
  });

  // Dados mockados
  const mockProjetos = [
    { id: 1, nome: 'Reflorestamento Urbano', descricao: 'Projeto de reflorestamento urbano para melhoria da qualidade do ar', responsavel: 'João Silva', status: 'Em Andamento', ativo: true },
    { id: 2, nome: 'Coleta Seletiva', descricao: 'Implementação de sistema de coleta seletiva municipal', responsavel: 'Maria Santos', status: 'Planejamento', ativo: true },
    { id: 3, nome: 'Monitoramento Hídrico', descricao: 'Monitoramento da qualidade da água dos rios da região', responsavel: 'Pedro Costa', status: 'Em Andamento', ativo: true },
    { id: 4, nome: 'Área de Preservação', descricao: 'Criação de área de preservação ambiental', responsavel: 'Ana Oliveira', status: 'Pausado', ativo: false },
    { id: 5, nome: 'Educação Ambiental', descricao: 'Programa de educação ambiental nas escolas', responsavel: 'Carlos Lima', status: 'Em Andamento', ativo: true },
    { id: 6, nome: 'Conscientização Resíduos', descricao: 'Campanha de conscientização sobre descarte de resíduos', responsavel: 'Lucia Ferreira', status: 'Concluído', ativo: true },
    { id: 7, nome: 'Estudo Impacto Ambiental', descricao: 'Estudo de impacto ambiental para novo distrito industrial', responsavel: 'Roberto Alves', status: 'Planejamento', ativo: true },
    { id: 8, nome: 'Recuperação Área Degradada', descricao: 'Recuperação de área degradada por mineração', responsavel: 'Fernanda Rocha', status: 'Cancelado', ativo: false }
  ];

  useEffect(() => {
    setProjetos(mockProjetos);
    setFilteredProjetos(mockProjetos);
  }, []);

  useEffect(() => {
    const filtered = projetos.filter(projeto =>
      projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjetos(filtered);
  }, [searchTerm, projetos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProjeto) {
      setProjetos(prev => prev.map(projeto => 
        projeto.id === editingProjeto.id 
          ? { ...projeto, ...formData }
          : projeto
      ));
    } else {
      const newProjeto = {
        id: Math.max(...projetos.map(p => p.id)) + 1,
        ...formData
      };
      setProjetos(prev => [...prev, newProjeto]);
    }
    
    resetForm();
  };

  const handleEdit = (projeto) => {
    setEditingProjeto(projeto);
    setFormData({
      nome: projeto.nome,
      descricao: projeto.descricao,
      responsavel: projeto.responsavel,
      status: projeto.status,
      ativo: projeto.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjetos(prev => prev.filter(projeto => projeto.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      responsavel: '',
      status: '',
      ativo: true
    });
    setEditingProjeto(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setProjetos(prev => prev.map(projeto => 
      projeto.id === id 
        ? { ...projeto, ativo: !projeto.ativo }
        : projeto
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Projetos</h1>
          <p>Gerenciamento de projetos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Projeto
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingProjeto ? 'Editar Projeto' : 'Cadastrar Projeto'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="nome">Nome do Projeto *</label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                  maxLength={200}
                  placeholder="Digite o nome do projeto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição *</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Digite a descrição do projeto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="responsavel">Responsável *</label>
                <input
                  type="text"
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome do responsável"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="">Selecione um status</option>
                  <option value="Planejamento">Planejamento</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Pausado">Pausado</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="form-group">
                <Toggle
                  id="ativo"
                  label="Status:"
                  checked={formData.ativo}
                  onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingProjeto ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <div className="table-controls">
          <div className="search-container">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredProjetos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjetos.map(projeto => (
                <tr key={projeto.id}>
                  <td>{projeto.id}</td>
                  <td>{projeto.nome}</td>
                  <td className="contexto-cell">{projeto.descricao}</td>
                  <td>{projeto.responsavel}</td>
                  <td>
                    <span className={`status-badge status-${projeto.status.toLowerCase().replace(' ', '-')}`}>
                      {projeto.status}
                    </span>
                  </td>
                  <td>
                    <Toggle
                      checked={projeto.ativo}
                      onChange={() => handleToggleStatus(projeto.id)}
                      id={`toggle-${projeto.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(projeto)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(projeto.id)}
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProjetos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum projeto encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo projeto.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projetos;