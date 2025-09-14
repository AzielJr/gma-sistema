import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import './Nucleos.css';

const Nucleos = () => {
  const [nucleos, setNucleos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nucleo: '',
    ativo: true
  });

  // Dados mockados para demonstração
  useEffect(() => {
    setNucleos([
      { id: 1, nucleo: 'Núcleo Central', ativo: true },
      { id: 2, nucleo: 'Núcleo Norte', ativo: true },
      { id: 3, nucleo: 'Núcleo Sul', ativo: false },
      { id: 4, nucleo: 'Núcleo Leste', ativo: true },
      { id: 5, nucleo: 'Núcleo Oeste', ativo: true }
    ]);
  }, []);

  const filteredNucleos = nucleos.filter(nucleo =>
    nucleo.nucleo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setNucleos(nucleos.map(nucleo =>
        nucleo.id === editingId ? { ...formData, id: editingId } : nucleo
      ));
    } else {
      const newId = Math.max(...nucleos.map(n => n.id), 0) + 1;
      setNucleos([...nucleos, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (nucleo) => {
    setFormData({
      nucleo: nucleo.nucleo,
      ativo: nucleo.ativo
    });
    setEditingId(nucleo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este núcleo?')) {
      setNucleos(nucleos.filter(nucleo => nucleo.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ nucleo: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setNucleos(nucleos.map(nucleo =>
      nucleo.id === id ? { ...nucleo, ativo: !nucleo.ativo } : nucleo
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Núcleos</h1>
          <p>Gerenciamento de núcleos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Núcleo
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Núcleo' : 'Cadastrar Núcleo'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="nucleo">Nome do Núcleo *</label>
                <input
                  type="text"
                  id="nucleo"
                  value={formData.nucleo}
                  onChange={(e) => setFormData({...formData, nucleo: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome do núcleo"
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
              placeholder="Pesquisar núcleos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredNucleos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Núcleo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredNucleos.map(nucleo => (
                <tr key={nucleo.id}>
                  <td>{nucleo.id}</td>
                  <td>{nucleo.nucleo}</td>
                  <td>
                    <Toggle
                      checked={nucleo.ativo}
                      onChange={() => handleToggleStatus(nucleo.id)}
                      id={`toggle-${nucleo.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(nucleo)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(nucleo.id)}
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
          
          {filteredNucleos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum núcleo encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo núcleo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nucleos;