import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Cidades = () => {
  const [cidades, setCidades] = useState([]);
  const [filteredCidades, setFilteredCidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCidade, setEditingCidade] = useState(null);
  const [formData, setFormData] = useState({
    cidade: '',
    ativo: true
  });

  // Dados mockados
  const mockCidades = [
    { id: 1, cidade: 'São Paulo', ativo: true },
    { id: 2, cidade: 'Rio de Janeiro', ativo: true },
    { id: 3, cidade: 'Belo Horizonte', ativo: true },
    { id: 4, cidade: 'Salvador', ativo: false },
    { id: 5, cidade: 'Brasília', ativo: true },
    { id: 6, cidade: 'Fortaleza', ativo: true },
    { id: 7, cidade: 'Recife', ativo: true },
    { id: 8, cidade: 'Porto Alegre', ativo: false },
    { id: 9, cidade: 'Manaus', ativo: true },
    { id: 10, cidade: 'Curitiba', ativo: true }
  ];

  useEffect(() => {
    setCidades(mockCidades);
    setFilteredCidades(mockCidades);
  }, []);

  useEffect(() => {
    const filtered = cidades.filter(cidade =>
      cidade.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCidades(filtered);
  }, [searchTerm, cidades]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCidade) {
      setCidades(prev => prev.map(cidade => 
        cidade.id === editingCidade.id 
          ? { ...cidade, ...formData }
          : cidade
      ));
    } else {
      const newCidade = {
        id: Math.max(...cidades.map(c => c.id)) + 1,
        ...formData
      };
      setCidades(prev => [...prev, newCidade]);
    }
    
    resetForm();
  };

  const handleEdit = (cidade) => {
    setEditingCidade(cidade);
    setFormData({
      cidade: cidade.cidade,
      ativo: cidade.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
      setCidades(prev => prev.filter(cidade => cidade.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      cidade: '',
      ativo: true
    });
    setEditingCidade(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setCidades(prev => prev.map(cidade => 
      cidade.id === id 
        ? { ...cidade, ativo: !cidade.ativo }
        : cidade
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Cidades</h1>
          <p>Gerenciamento de cidades do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Cidade
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingCidade ? 'Editar Cidade' : 'Cadastrar Cidade'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="cidade">Nome da Cidade *</label>
                <input
                  type="text"
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome da cidade"
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
                  {editingCidade ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar cidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredCidades.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCidades.map(cidade => (
                <tr key={cidade.id}>
                  <td>{cidade.id}</td>
                  <td>{cidade.cidade}</td>
                  <td>
                    <Toggle
                      checked={cidade.ativo}
                      onChange={() => handleToggleStatus(cidade.id)}
                      id={`toggle-${cidade.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(cidade)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(cidade.id)}
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
          
          {filteredCidades.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma cidade encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova cidade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cidades;