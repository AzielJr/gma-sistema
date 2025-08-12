import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const TipoEnquadramento = () => {
  const [tiposEnquadramento, setTiposEnquadramento] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tipo_enquadramento: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockTiposEnquadramento = [
    { id: 1, tipo_enquadramento: 'Microempresa', ativo: true },
    { id: 2, tipo_enquadramento: 'Empresa de Pequeno Porte', ativo: true },
    { id: 3, tipo_enquadramento: 'Empresa de Médio Porte', ativo: true },
    { id: 4, tipo_enquadramento: 'Empresa de Grande Porte', ativo: true },
    { id: 5, tipo_enquadramento: 'Microempreendedor Individual', ativo: true },
    { id: 6, tipo_enquadramento: 'Cooperativa', ativo: false }
  ];

  useEffect(() => {
    setTiposEnquadramento(mockTiposEnquadramento);
  }, []);

  const filteredTiposEnquadramento = tiposEnquadramento.filter(tipo =>
    tipo.tipo_enquadramento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setTiposEnquadramento(tiposEnquadramento.map(tipo =>
        tipo.id === editingId ? { ...formData, id: editingId } : tipo
      ));
    } else {
      const newId = Math.max(...tiposEnquadramento.map(t => t.id), 0) + 1;
      setTiposEnquadramento([...tiposEnquadramento, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (tipo) => {
    setFormData({
      tipo_enquadramento: tipo.tipo_enquadramento,
      ativo: tipo.ativo
    });
    setEditingId(tipo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo de enquadramento?')) {
      setTiposEnquadramento(tiposEnquadramento.filter(tipo => tipo.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ tipo_enquadramento: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setTiposEnquadramento(tiposEnquadramento.map(tipo =>
      tipo.id === id ? { ...tipo, ativo: !tipo.ativo } : tipo
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Tipo de Enquadramento</h1>
          <p>Gerenciamento de tipos de enquadramento do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Tipo de Enquadramento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Tipo de Enquadramento' : 'Cadastrar Tipo de Enquadramento'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="tipo_enquadramento">Tipo de Enquadramento *</label>
                <input
                  type="text"
                  id="tipo_enquadramento"
                  value={formData.tipo_enquadramento}
                  onChange={(e) => setFormData({...formData, tipo_enquadramento: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o tipo de enquadramento"
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
              placeholder="Pesquisar tipos de enquadramento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredTiposEnquadramento.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de Enquadramento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTiposEnquadramento.map(tipo => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.tipo_enquadramento}</td>
                  <td>
                    <Toggle
                      checked={tipo.ativo}
                      onChange={() => handleToggleStatus(tipo.id)}
                      id={`toggle-${tipo.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(tipo)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(tipo.id)}
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
          
          {filteredTiposEnquadramento.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum tipo de enquadramento encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo tipo de enquadramento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipoEnquadramento;