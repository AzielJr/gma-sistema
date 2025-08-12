import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Nacionalidades = () => {
  const [nacionalidades, setNacionalidades] = useState([]);
  const [filteredNacionalidades, setFilteredNacionalidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNacionalidade, setEditingNacionalidade] = useState(null);
  const [formData, setFormData] = useState({
    nacionalidade: '',
    ativo: true
  });

  // Dados mockados
  const mockNacionalidades = [
    { id: 1, nacionalidade: 'Brasileira', ativo: true },
    { id: 2, nacionalidade: 'Americana', ativo: true },
    { id: 3, nacionalidade: 'Argentina', ativo: true },
    { id: 4, nacionalidade: 'Portuguesa', ativo: false },
    { id: 5, nacionalidade: 'Italiana', ativo: true },
    { id: 6, nacionalidade: 'Espanhola', ativo: true },
    { id: 7, nacionalidade: 'Francesa', ativo: true },
    { id: 8, nacionalidade: 'Alemã', ativo: false },
    { id: 9, nacionalidade: 'Japonesa', ativo: true },
    { id: 10, nacionalidade: 'Chinesa', ativo: true }
  ];

  useEffect(() => {
    setNacionalidades(mockNacionalidades);
    setFilteredNacionalidades(mockNacionalidades);
  }, []);

  useEffect(() => {
    const filtered = nacionalidades.filter(nacionalidade =>
      nacionalidade.nacionalidade.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNacionalidades(filtered);
  }, [searchTerm, nacionalidades]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNacionalidade) {
      setNacionalidades(prev => prev.map(nacionalidade => 
        nacionalidade.id === editingNacionalidade.id 
          ? { ...nacionalidade, ...formData }
          : nacionalidade
      ));
    } else {
      const newNacionalidade = {
        id: Math.max(...nacionalidades.map(n => n.id)) + 1,
        ...formData
      };
      setNacionalidades(prev => [...prev, newNacionalidade]);
    }
    
    resetForm();
  };

  const handleEdit = (nacionalidade) => {
    setEditingNacionalidade(nacionalidade);
    setFormData({
      nacionalidade: nacionalidade.nacionalidade,
      ativo: nacionalidade.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta nacionalidade?')) {
      setNacionalidades(prev => prev.filter(nacionalidade => nacionalidade.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nacionalidade: '',
      ativo: true
    });
    setEditingNacionalidade(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setNacionalidades(prev => prev.map(nacionalidade => 
      nacionalidade.id === id 
        ? { ...nacionalidade, ativo: !nacionalidade.ativo }
        : nacionalidade
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Nacionalidades</h1>
          <p>Gerenciamento de nacionalidades do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Nacionalidade
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingNacionalidade ? 'Editar Nacionalidade' : 'Cadastrar Nacionalidade'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="nacionalidade">Nacionalidade *</label>
                <input
                  type="text"
                  id="nacionalidade"
                  value={formData.nacionalidade}
                  onChange={(e) => setFormData({...formData, nacionalidade: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a nacionalidade"
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
                  {editingNacionalidade ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar nacionalidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredNacionalidades.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nacionalidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredNacionalidades.map(nacionalidade => (
                <tr key={nacionalidade.id}>
                  <td>{nacionalidade.id}</td>
                  <td>{nacionalidade.nacionalidade}</td>
                  <td>
                    <Toggle
                      checked={nacionalidade.ativo}
                      onChange={() => handleToggleStatus(nacionalidade.id)}
                      id={`toggle-${nacionalidade.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(nacionalidade)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(nacionalidade.id)}
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
          
          {filteredNacionalidades.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma nacionalidade encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova nacionalidade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nacionalidades;