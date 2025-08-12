import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const GrauPoluidor = () => {
  const [grausPoluidor, setGrausPoluidor] = useState([]);
  const [filteredGrausPoluidor, setFilteredGrausPoluidor] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingGrauPoluidor, setEditingGrauPoluidor] = useState(null);
  const [formData, setFormData] = useState({
    grau_poluidor: '',
    porte: '',
    grau: '',
    valor_conversao: '',
    ativo: true
  });

  // Dados mockados
  const mockGrausPoluidor = [
    { 
      id: 1, 
      grau_poluidor: 'Baixo Impacto Ambiental', 
      porte: 'Micro', 
      grau: 'Baixo', 
      valor_conversao: 1.00, 
      ativo: true 
    },
    { 
      id: 2, 
      grau_poluidor: 'Médio Impacto Ambiental', 
      porte: 'Pequeno', 
      grau: 'Médio', 
      valor_conversao: 2.50, 
      ativo: true 
    },
    { 
      id: 3, 
      grau_poluidor: 'Alto Impacto Ambiental', 
      porte: 'Médio', 
      grau: 'Alto', 
      valor_conversao: 5.00, 
      ativo: true 
    },
    { 
      id: 4, 
      grau_poluidor: 'Muito Alto Impacto Ambiental', 
      porte: 'Grande', 
      grau: 'Alto', 
      valor_conversao: 10.00, 
      ativo: true 
    },
    { 
      id: 5, 
      grau_poluidor: 'Impacto Insignificante', 
      porte: 'Micro', 
      grau: 'Baixo', 
      valor_conversao: 0.50, 
      ativo: false 
    },
    { 
      id: 6, 
      grau_poluidor: 'Impacto Excepcional', 
      porte: 'Especial', 
      grau: 'Alto', 
      valor_conversao: 15.00, 
      ativo: true 
    }
  ];

  useEffect(() => {
    setGrausPoluidor(mockGrausPoluidor);
    setFilteredGrausPoluidor(mockGrausPoluidor);
  }, []);

  useEffect(() => {
    const filtered = grausPoluidor.filter(grau =>
      grau.grau_poluidor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grau.porte.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grau.grau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grau.valor_conversao.toString().includes(searchTerm)
    );
    setFilteredGrausPoluidor(filtered);
  }, [searchTerm, grausPoluidor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingGrauPoluidor) {
      setGrausPoluidor(prev => prev.map(grau => 
        grau.id === editingGrauPoluidor.id 
          ? { 
              ...grau, 
              ...formData, 
              valor_conversao: parseFloat(formData.valor_conversao)
            }
          : grau
      ));
    } else {
      const newGrauPoluidor = {
        id: Math.max(...grausPoluidor.map(g => g.id)) + 1,
        ...formData,
        valor_conversao: parseFloat(formData.valor_conversao)
      };
      setGrausPoluidor(prev => [...prev, newGrauPoluidor]);
    }
    
    resetForm();
  };

  const handleEdit = (grauPoluidor) => {
    setEditingGrauPoluidor(grauPoluidor);
    setFormData({
      grau_poluidor: grauPoluidor.grau_poluidor,
      porte: grauPoluidor.porte,
      grau: grauPoluidor.grau,
      valor_conversao: grauPoluidor.valor_conversao.toString(),
      ativo: grauPoluidor.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este grau poluidor?')) {
      setGrausPoluidor(prev => prev.filter(grau => grau.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      grau_poluidor: '',
      porte: '',
      grau: '',
      valor_conversao: '',
      ativo: true
    });
    setEditingGrauPoluidor(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setGrausPoluidor(prev => prev.map(grau => 
      grau.id === id 
        ? { ...grau, ativo: !grau.ativo }
        : grau
    ));
  };

  const getGrauBadgeClass = (grau) => {
    switch(grau.toLowerCase()) {
      case 'baixo': return 'grau-badge baixo';
      case 'médio': return 'grau-badge medio';
      case 'alto': return 'grau-badge alto';
      default: return 'grau-badge';
    }
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Grau Poluidor</h1>
          <p>Gerenciamento de graus poluidores e classificações ambientais</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Grau
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingGrauPoluidor ? 'Editar Grau Poluidor' : 'Cadastrar Grau Poluidor'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="grau">Grau *</label>
                <select
                  id="grau"
                  value={formData.grau}
                  onChange={(e) => setFormData({...formData, grau: e.target.value})}
                  required
                >
                  <option value="">Selecione um grau</option>
                  <option value="Baixo">Baixo</option>
                  <option value="Médio">Médio</option>
                  <option value="Alto">Alto</option>
                  <option value="Muito Alto">Muito Alto</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição *</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                  rows={3}
                  maxLength={500}
                  placeholder="Digite a descrição do grau poluidor"
                />
              </div>

              <div className="form-group">
                <label htmlFor="criterios">Critérios de Avaliação</label>
                <textarea
                  id="criterios"
                  value={formData.criterios}
                  onChange={(e) => setFormData({...formData, criterios: e.target.value})}
                  rows={4}
                  maxLength={1000}
                  placeholder="Digite os critérios de avaliação"
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
                  {editingGrauPoluidor ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar graus poluidores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredGrausPoluidor.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Grau</th>
                <th>Descrição</th>
                <th>Critérios</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrausPoluidor.map(grau => (
                <tr key={grau.id}>
                  <td>{grau.id}</td>
                  <td>
                    <span className={`grau-badge ${grau.grau.toLowerCase().replace(' ', '-')}`}>
                      {grau.grau}
                    </span>
                  </td>
                  <td className="contexto-cell">{grau.descricao}</td>
                  <td className="contexto-cell">{grau.criterios}</td>
                  <td>
                    <Toggle
                      checked={grau.ativo}
                      onChange={() => handleToggleStatus(grau.id)}
                      id={`toggle-${grau.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(grau)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(grau.id)}
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
          
          {filteredGrausPoluidor.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum grau poluidor encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo grau poluidor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrauPoluidor;