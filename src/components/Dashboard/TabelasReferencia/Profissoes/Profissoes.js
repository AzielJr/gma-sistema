import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Profissoes = () => {
  const [profissoes, setProfissoes] = useState([]);
  const [filteredProfissoes, setFilteredProfissoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProfissao, setEditingProfissao] = useState(null);
  const [formData, setFormData] = useState({
    profissao: '',
    ativo: true
  });

  // Dados mockados
  const mockProfissoes = [
    { id: 1, profissao: 'Engenheiro Ambiental', ativo: true },
    { id: 2, profissao: 'Biólogo', ativo: true },
    { id: 3, profissao: 'Advogado', ativo: true },
    { id: 4, profissao: 'Técnico em Meio Ambiente', ativo: false },
    { id: 5, profissao: 'Geólogo', ativo: true },
    { id: 6, profissao: 'Químico', ativo: true },
    { id: 7, profissao: 'Engenheiro Civil', ativo: true },
    { id: 8, profissao: 'Arquiteto', ativo: false },
    { id: 9, profissao: 'Veterinário', ativo: true },
    { id: 10, profissao: 'Agrônomo', ativo: true }
  ];

  useEffect(() => {
    setProfissoes(mockProfissoes);
    setFilteredProfissoes(mockProfissoes);
  }, []);

  useEffect(() => {
    const filtered = profissoes.filter(profissao =>
      profissao.profissao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfissoes(filtered);
  }, [searchTerm, profissoes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProfissao) {
      setProfissoes(prev => prev.map(profissao => 
        profissao.id === editingProfissao.id 
          ? { ...profissao, ...formData }
          : profissao
      ));
    } else {
      const newProfissao = {
        id: Math.max(...profissoes.map(p => p.id)) + 1,
        ...formData
      };
      setProfissoes(prev => [...prev, newProfissao]);
    }
    
    resetForm();
  };

  const handleEdit = (profissao) => {
    setEditingProfissao(profissao);
    setFormData({
      profissao: profissao.profissao,
      ativo: profissao.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta profissão?')) {
      setProfissoes(prev => prev.filter(profissao => profissao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      profissao: '',
      ativo: true
    });
    setEditingProfissao(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setProfissoes(prev => prev.map(profissao => 
      profissao.id === id 
        ? { ...profissao, ativo: !profissao.ativo }
        : profissao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Profissões</h1>
          <p>Gerenciamento de profissões do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Profissão
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingProfissao ? 'Editar Profissão' : 'Cadastrar Profissão'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="profissao">Nome da Profissão *</label>
                <input
                  type="text"
                  id="profissao"
                  value={formData.profissao}
                  onChange={(e) => setFormData({...formData, profissao: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome da profissão"
                />
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
                  {editingProfissao ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar profissões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredProfissoes.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Profissão</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfissoes.map(profissao => (
                <tr key={profissao.id}>
                  <td>{profissao.id}</td>
                  <td>{profissao.profissao}</td>
                  <td>
                    <Toggle
                      checked={profissao.ativo}
                      onChange={() => handleToggleStatus(profissao.id)}
                      id={`toggle-${profissao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(profissao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(profissao.id)}
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProfissoes.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma profissão encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova profissão.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profissoes;