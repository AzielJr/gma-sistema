import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const PrazosValidacao = () => {
  const [prazosValidacao, setPrazosValidacao] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    descricao: '',
    validade: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockPrazosValidacao = [
    { id: 1, descricao: 'Licença de Operação', validade: 365, ativo: true },
    { id: 2, descricao: 'Licença Prévia', validade: 180, ativo: true },
    { id: 3, descricao: 'Licença de Instalação', validade: 730, ativo: true },
    { id: 4, descricao: 'Autorização Ambiental', validade: 90, ativo: true },
    { id: 5, descricao: 'Certificado de Regularidade', validade: 1095, ativo: true },
    { id: 6, descricao: 'Licença Simplificada', validade: 120, ativo: false }
  ];

  useEffect(() => {
    setPrazosValidacao(mockPrazosValidacao);
  }, []);

  const filteredPrazosValidacao = prazosValidacao.filter(prazo =>
    prazo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setPrazosValidacao(prazosValidacao.map(prazo =>
        prazo.id === editingId ? { ...formData, id: editingId, validade: parseInt(formData.validade) } : prazo
      ));
    } else {
      const newId = Math.max(...prazosValidacao.map(p => p.id), 0) + 1;
      setPrazosValidacao([...prazosValidacao, { ...formData, id: newId, validade: parseInt(formData.validade) }]);
    }
    
    resetForm();
  };

  const handleEdit = (prazo) => {
    setFormData({
      descricao: prazo.descricao,
      validade: prazo.validade.toString(),
      ativo: prazo.ativo
    });
    setEditingId(prazo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este prazo de validação?')) {
      setPrazosValidacao(prazosValidacao.filter(prazo => prazo.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ descricao: '', validade: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setPrazosValidacao(prazosValidacao.map(prazo =>
      prazo.id === id ? { ...prazo, ativo: !prazo.ativo } : prazo
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Prazos de Validação</h1>
          <p>Gerenciamento de prazos de validação do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Prazo
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Prazo de Validação' : 'Cadastrar Prazo de Validação'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="descricao">Descrição *</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                  rows={3}
                  placeholder="Digite a descrição do prazo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="validade">Validade (dias) *</label>
                <input
                  type="number"
                  id="validade"
                  value={formData.validade}
                  onChange={(e) => setFormData({...formData, validade: e.target.value})}
                  required
                  min="1"
                  placeholder="Digite a validade em dias"
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
              placeholder="Pesquisar prazos de validação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredPrazosValidacao.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Validade (dias)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrazosValidacao.map(prazo => (
                <tr key={prazo.id}>
                  <td>{prazo.id}</td>
                  <td>{prazo.descricao}</td>
                  <td>{prazo.validade}</td>
                  <td>
                    <Toggle
                      checked={prazo.ativo}
                      onChange={() => handleToggleStatus(prazo.id)}
                      id={`toggle-${prazo.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(prazo)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(prazo.id)}
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
          
          {filteredPrazosValidacao.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum prazo de validação encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo prazo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrazosValidacao;