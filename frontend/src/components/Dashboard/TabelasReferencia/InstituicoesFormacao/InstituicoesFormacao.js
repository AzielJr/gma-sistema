import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const InstituicoesFormacao = () => {
  const [instituicoes, setInstituicoes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    instituicao: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockInstituicoes = [
    { id: 1, instituicao: 'Universidade Federal de Minas Gerais', ativo: true },
    { id: 2, instituicao: 'Pontifícia Universidade Católica de Minas Gerais', ativo: true },
    { id: 3, instituicao: 'Universidade Federal de Viçosa', ativo: true },
    { id: 4, instituicao: 'Centro Federal de Educação Tecnológica de Minas Gerais', ativo: true },
    { id: 5, instituicao: 'Universidade do Estado de Minas Gerais', ativo: true },
    { id: 6, instituicao: 'Faculdade de Engenharia de Minas Gerais', ativo: false }
  ];

  useEffect(() => {
    setInstituicoes(mockInstituicoes);
  }, []);

  const filteredInstituicoes = instituicoes.filter(instituicao =>
    instituicao.instituicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setInstituicoes(instituicoes.map(instituicao =>
        instituicao.id === editingId ? { ...formData, id: editingId } : instituicao
      ));
    } else {
      const newId = Math.max(...instituicoes.map(i => i.id), 0) + 1;
      setInstituicoes([...instituicoes, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (instituicao) => {
    setFormData({
      instituicao: instituicao.instituicao,
      ativo: instituicao.ativo
    });
    setEditingId(instituicao.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta instituição de formação?')) {
      setInstituicoes(instituicoes.filter(instituicao => instituicao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ instituicao: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setInstituicoes(instituicoes.map(instituicao =>
      instituicao.id === id ? { ...instituicao, ativo: !instituicao.ativo } : instituicao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Instituições de Formação</h1>
          <p>Gerenciamento de instituições de formação do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Instituição
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Instituição de Formação' : 'Cadastrar Instituição de Formação'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="instituicao">Instituição *</label>
                <input
                  type="text"
                  id="instituicao"
                  value={formData.instituicao}
                  onChange={(e) => setFormData({...formData, instituicao: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome da instituição"
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
                  {editingId ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar instituições..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredInstituicoes.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Instituição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstituicoes.map(instituicao => (
                <tr key={instituicao.id}>
                  <td>{instituicao.id}</td>
                  <td>{instituicao.instituicao}</td>
                  <td>
                    <Toggle
                      checked={instituicao.ativo}
                      onChange={() => handleToggleStatus(instituicao.id)}
                      id={`toggle-${instituicao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(instituicao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(instituicao.id)}
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
          
          {filteredInstituicoes.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma instituição encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova instituição.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstituicoesFormacao;