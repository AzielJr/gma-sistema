import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const UnidadeMedida = () => {
  const [unidades, setUnidades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    unidade_medida: '',
    sigla: '',
    ativo: true
  });

  // Dados mockados para demonstração
  useEffect(() => {
    setUnidades([
      { id: 1, unidade_medida: 'Metro', sigla: 'm', ativo: true },
      { id: 2, unidade_medida: 'Quilômetro', sigla: 'km', ativo: true },
      { id: 3, unidade_medida: 'Litro', sigla: 'l', ativo: true },
      { id: 4, unidade_medida: 'Quilograma', sigla: 'kg', ativo: false },
      { id: 5, unidade_medida: 'Metro Quadrado', sigla: 'm²', ativo: true }
    ]);
  }, []);

  const filteredUnidades = unidades.filter(unidade =>
    unidade.unidade_medida.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unidade.sigla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setUnidades(unidades.map(unidade =>
        unidade.id === editingId ? { ...formData, id: editingId } : unidade
      ));
    } else {
      const newId = Math.max(...unidades.map(u => u.id), 0) + 1;
      setUnidades([...unidades, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (unidade) => {
    setFormData({
      unidade_medida: unidade.unidade_medida,
      sigla: unidade.sigla,
      ativo: unidade.ativo
    });
    setEditingId(unidade.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade de medida?')) {
      setUnidades(unidades.filter(unidade => unidade.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ unidade_medida: '', sigla: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setUnidades(unidades.map(unidade =>
      unidade.id === id ? { ...unidade, ativo: !unidade.ativo } : unidade
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Unidades de Medida</h1>
          <p>Gerenciamento de unidades de medida do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Unidade
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Unidade de Medida' : 'Cadastrar Unidade de Medida'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="unidade_medida">Unidade de Medida *</label>
                <input
                  type="text"
                  id="unidade_medida"
                  value={formData.unidade_medida}
                  onChange={(e) => setFormData({...formData, unidade_medida: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a unidade de medida"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sigla">Sigla *</label>
                <input
                  type="text"
                  id="sigla"
                  value={formData.sigla}
                  onChange={(e) => setFormData({...formData, sigla: e.target.value})}
                  required
                  maxLength={20}
                  placeholder="Digite a sigla"
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
              placeholder="Pesquisar unidades de medida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredUnidades.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Unidade de Medida</th>
                <th>Sigla</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnidades.map(unidade => (
                <tr key={unidade.id}>
                  <td>{unidade.id}</td>
                  <td>{unidade.unidade_medida}</td>
                  <td>
                    <span className="sigla-badge">{unidade.sigla}</span>
                  </td>
                  <td>
                    <Toggle
                      checked={unidade.ativo}
                      onChange={() => handleToggleStatus(unidade.id)}
                      id={`toggle-${unidade.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(unidade)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(unidade.id)}
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
          
          {filteredUnidades.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma unidade de medida encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova unidade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnidadeMedida;