import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const StatusProcesso = () => {
  const [statusProcessos, setStatusProcessos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    status_processo: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockStatusProcessos = [
    { id: 1, status_processo: 'Aguardando análise técnica', ativo: true },
    { id: 2, status_processo: 'Em análise documental', ativo: true },
    { id: 3, status_processo: 'Aguardando complementação de documentos', ativo: true },
    { id: 4, status_processo: 'Aprovado', ativo: true },
    { id: 5, status_processo: 'Reprovado', ativo: true },
    { id: 6, status_processo: 'Cancelado', ativo: false }
  ];

  useEffect(() => {
    setStatusProcessos(mockStatusProcessos);
  }, []);

  const filteredStatusProcessos = statusProcessos.filter(status =>
    status.status_processo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setStatusProcessos(statusProcessos.map(status =>
        status.id === editingId ? { ...formData, id: editingId } : status
      ));
    } else {
      const newId = Math.max(...statusProcessos.map(s => s.id), 0) + 1;
      setStatusProcessos([...statusProcessos, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (status) => {
    setFormData({
      status_processo: status.status_processo,
      ativo: status.ativo
    });
    setEditingId(status.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este status de processo?')) {
      setStatusProcessos(statusProcessos.filter(status => status.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ status_processo: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setStatusProcessos(statusProcessos.map(status =>
      status.id === id ? { ...status, ativo: !status.ativo } : status
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Status de Processo</h1>
          <p>Gerenciamento de status de processos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Status
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Status de Processo' : 'Cadastrar Status de Processo'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="status_processo">Status do Processo *</label>
                <textarea
                  id="status_processo"
                  value={formData.status_processo}
                  onChange={(e) => setFormData({...formData, status_processo: e.target.value})}
                  required
                  rows={3}
                  placeholder="Digite o status do processo"
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
              placeholder="Pesquisar status de processos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredStatusProcessos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status do Processo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredStatusProcessos.map(status => (
                <tr key={status.id}>
                  <td>{status.id}</td>
                  <td>{status.status_processo}</td>
                  <td>
                    <Toggle
                      checked={status.ativo}
                      onChange={() => handleToggleStatus(status.id)}
                      id={`toggle-${status.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(status)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(status.id)}
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
          
          {filteredStatusProcessos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum status de processo encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusProcesso;