import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Bairros = () => {
  const [bairros, setBairros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    bairro: '',
    ativo: true
  });

  // Dados mockados para demonstração
  useEffect(() => {
    setBairros([
      { id: 1, bairro: 'Centro', ativo: true },
      { id: 2, bairro: 'Vila Nova', ativo: true },
      { id: 3, bairro: 'Jardim das Flores', ativo: false },
      { id: 4, bairro: 'Bela Vista', ativo: true },
      { id: 5, bairro: 'São José', ativo: true }
    ]);
  }, []);

  const filteredBairros = bairros.filter(bairro =>
    bairro.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setBairros(bairros.map(bairro =>
        bairro.id === editingId ? { ...formData, id: editingId } : bairro
      ));
    } else {
      const newId = Math.max(...bairros.map(b => b.id), 0) + 1;
      setBairros([...bairros, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (bairro) => {
    setFormData({
      bairro: bairro.bairro,
      ativo: bairro.ativo
    });
    setEditingId(bairro.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este bairro?')) {
      setBairros(bairros.filter(bairro => bairro.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ bairro: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setBairros(bairros.map(bairro =>
      bairro.id === id ? { ...bairro, ativo: !bairro.ativo } : bairro
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Bairros</h1>
          <p>Gerenciamento de bairros do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Bairro
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Bairro' : 'Cadastrar Bairro'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="bairro">Nome do Bairro *</label>
                <input
                  type="text"
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome do bairro"
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
              placeholder="Pesquisar bairros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredBairros.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bairro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBairros.map(bairro => (
                <tr key={bairro.id}>
                  <td>{bairro.id}</td>
                  <td>{bairro.bairro}</td>
                  <td>
                    <Toggle
                      checked={bairro.ativo}
                      onChange={() => handleToggleStatus(bairro.id)}
                      id={`toggle-${bairro.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(bairro)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(bairro.id)}
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
          
          {filteredBairros.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum bairro encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo bairro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bairros;