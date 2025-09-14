import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const GrauInstrucao = () => {
  const [grausInstrucao, setGrausInstrucao] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    grau_instrucao: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockGrausInstrucao = [
    { id: 1, grau_instrucao: 'Ensino Fundamental Incompleto', ativo: true },
    { id: 2, grau_instrucao: 'Ensino Fundamental Completo', ativo: true },
    { id: 3, grau_instrucao: 'Ensino Médio Incompleto', ativo: true },
    { id: 4, grau_instrucao: 'Ensino Médio Completo', ativo: true },
    { id: 5, grau_instrucao: 'Ensino Superior Incompleto', ativo: true },
    { id: 6, grau_instrucao: 'Ensino Superior Completo', ativo: true },
    { id: 7, grau_instrucao: 'Pós-graduação', ativo: true },
    { id: 8, grau_instrucao: 'Mestrado', ativo: true },
    { id: 9, grau_instrucao: 'Doutorado', ativo: false }
  ];

  useEffect(() => {
    setGrausInstrucao(mockGrausInstrucao);
  }, []);

  const filteredGrausInstrucao = grausInstrucao.filter(grau =>
    grau.grau_instrucao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setGrausInstrucao(grausInstrucao.map(grau =>
        grau.id === editingId ? { ...formData, id: editingId } : grau
      ));
    } else {
      const newId = Math.max(...grausInstrucao.map(g => g.id), 0) + 1;
      setGrausInstrucao([...grausInstrucao, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (grau) => {
    setFormData({
      grau_instrucao: grau.grau_instrucao,
      ativo: grau.ativo
    });
    setEditingId(grau.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este grau de instrução?')) {
      setGrausInstrucao(grausInstrucao.filter(grau => grau.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ grau_instrucao: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setGrausInstrucao(grausInstrucao.map(grau =>
      grau.id === id ? { ...grau, ativo: !grau.ativo } : grau
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Grau de Instrução</h1>
          <p>Gerenciamento de graus de instrução do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Grau de Instrução
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Grau de Instrução' : 'Cadastrar Grau de Instrução'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="grau_instrucao">Grau de Instrução *</label>
                <input
                  type="text"
                  id="grau_instrucao"
                  value={formData.grau_instrucao}
                  onChange={(e) => setFormData({...formData, grau_instrucao: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o grau de instrução"
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
              placeholder="Pesquisar graus de instrução..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredGrausInstrucao.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Grau de Instrução</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrausInstrucao.map(grau => (
                <tr key={grau.id}>
                  <td>{grau.id}</td>
                  <td>{grau.grau_instrucao}</td>
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
          
          {filteredGrausInstrucao.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum grau de instrução encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo grau de instrução.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrauInstrucao;