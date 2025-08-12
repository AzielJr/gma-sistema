import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const OrgaoEspecialidades = () => {
  const [orgaoEspecialidades, setOrgaoEspecialidades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    especialidade: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockOrgaoEspecialidades = [
    { id: 1, especialidade: 'Cardiologia', ativo: true },
    { id: 2, especialidade: 'Neurologia', ativo: true },
    { id: 3, especialidade: 'Ortopedia', ativo: true },
    { id: 4, especialidade: 'Pediatria', ativo: true },
    { id: 5, especialidade: 'Ginecologia', ativo: true },
    { id: 6, especialidade: 'Dermatologia', ativo: false }
  ];

  useEffect(() => {
    setOrgaoEspecialidades(mockOrgaoEspecialidades);
  }, []);

  const filteredOrgaoEspecialidades = orgaoEspecialidades.filter(especialidade =>
    especialidade.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setOrgaoEspecialidades(orgaoEspecialidades.map(especialidade =>
        especialidade.id === editingId ? { ...formData, id: editingId } : especialidade
      ));
    } else {
      const newId = Math.max(...orgaoEspecialidades.map(e => e.id), 0) + 1;
      setOrgaoEspecialidades([...orgaoEspecialidades, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (especialidade) => {
    setFormData({
      especialidade: especialidade.especialidade,
      ativo: especialidade.ativo
    });
    setEditingId(especialidade.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta especialidade?')) {
      setOrgaoEspecialidades(orgaoEspecialidades.filter(especialidade => especialidade.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ especialidade: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setOrgaoEspecialidades(orgaoEspecialidades.map(especialidade =>
      especialidade.id === id ? { ...especialidade, ativo: !especialidade.ativo } : especialidade
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Órgão de Especialidades</h1>
          <p>Gerenciamento de especialidades de órgãos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Especialidade
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Especialidade' : 'Cadastrar Especialidade'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="especialidade">Especialidade *</label>
                <input
                  type="text"
                  id="especialidade"
                  value={formData.especialidade}
                  onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a especialidade"
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
              placeholder="Pesquisar especialidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredOrgaoEspecialidades.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Especialidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgaoEspecialidades.map(especialidade => (
                <tr key={especialidade.id}>
                  <td>{especialidade.id}</td>
                  <td>{especialidade.especialidade}</td>
                  <td>
                    <Toggle
                      checked={especialidade.ativo}
                      onChange={() => handleToggleStatus(especialidade.id)}
                      id={`toggle-${especialidade.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(especialidade)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(especialidade.id)}
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
          
          {filteredOrgaoEspecialidades.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma especialidade encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova especialidade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgaoEspecialidades;