import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const SituacaoFuncional = () => {
  const [situacoesFuncionais, setSituacoesFuncionais] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    situacao_funcional: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockSituacoesFuncionais = [
    { id: 1, situacao_funcional: 'Ativo', ativo: true },
    { id: 2, situacao_funcional: 'Inativo', ativo: true },
    { id: 3, situacao_funcional: 'Licença Médica', ativo: true },
    { id: 4, situacao_funcional: 'Férias', ativo: true },
    { id: 5, situacao_funcional: 'Aposentado', ativo: false }
  ];

  useEffect(() => {
    setSituacoesFuncionais(mockSituacoesFuncionais);
  }, []);

  const filteredSituacoesFuncionais = situacoesFuncionais.filter(situacao =>
    situacao.situacao_funcional.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setSituacoesFuncionais(situacoesFuncionais.map(situacao =>
        situacao.id === editingId ? { ...formData, id: editingId } : situacao
      ));
    } else {
      const newId = Math.max(...situacoesFuncionais.map(s => s.id), 0) + 1;
      setSituacoesFuncionais([...situacoesFuncionais, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (situacao) => {
    setFormData({
      situacao_funcional: situacao.situacao_funcional,
      ativo: situacao.ativo
    });
    setEditingId(situacao.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta situação funcional?')) {
      setSituacoesFuncionais(situacoesFuncionais.filter(situacao => situacao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ situacao_funcional: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setSituacoesFuncionais(situacoesFuncionais.map(situacao =>
      situacao.id === id ? { ...situacao, ativo: !situacao.ativo } : situacao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Situação Funcional</h1>
          <p>Gerenciamento de situações funcionais do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Situação Funcional
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Situação Funcional' : 'Cadastrar Situação Funcional'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="situacao_funcional">Situação Funcional *</label>
                <input
                  type="text"
                  id="situacao_funcional"
                  value={formData.situacao_funcional}
                  onChange={(e) => setFormData({...formData, situacao_funcional: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a situação funcional"
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
              placeholder="Pesquisar situações funcionais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredSituacoesFuncionais.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Situação Funcional</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSituacoesFuncionais.map(situacao => (
                <tr key={situacao.id}>
                  <td>{situacao.id}</td>
                  <td>{situacao.situacao_funcional}</td>
                  <td>
                    <Toggle
                      checked={situacao.ativo}
                      onChange={() => handleToggleStatus(situacao.id)}
                      id={`toggle-${situacao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(situacao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(situacao.id)}
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
          
          {filteredSituacoesFuncionais.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma situação funcional encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova situação funcional.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SituacaoFuncional;