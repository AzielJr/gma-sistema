import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const ClassificacaoEnquadramento = () => {
  const [classificacoesEnquadramento, setClassificacoesEnquadramento] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    classificacao_enquadramento: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockClassificacoesEnquadramento = [
    { id: 1, classificacao_enquadramento: 'Simples Nacional', ativo: true },
    { id: 2, classificacao_enquadramento: 'Lucro Presumido', ativo: true },
    { id: 3, classificacao_enquadramento: 'Lucro Real', ativo: true },
    { id: 4, classificacao_enquadramento: 'Lucro Arbitrado', ativo: true },
    { id: 5, classificacao_enquadramento: 'Imune', ativo: true },
    { id: 6, classificacao_enquadramento: 'Isento', ativo: false }
  ];

  useEffect(() => {
    setClassificacoesEnquadramento(mockClassificacoesEnquadramento);
  }, []);

  const filteredClassificacoesEnquadramento = classificacoesEnquadramento.filter(classificacao =>
    classificacao.classificacao_enquadramento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setClassificacoesEnquadramento(classificacoesEnquadramento.map(classificacao =>
        classificacao.id === editingId ? { ...formData, id: editingId } : classificacao
      ));
    } else {
      const newId = Math.max(...classificacoesEnquadramento.map(c => c.id), 0) + 1;
      setClassificacoesEnquadramento([...classificacoesEnquadramento, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (classificacao) => {
    setFormData({
      classificacao_enquadramento: classificacao.classificacao_enquadramento,
      ativo: classificacao.ativo
    });
    setEditingId(classificacao.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta classificação de enquadramento?')) {
      setClassificacoesEnquadramento(classificacoesEnquadramento.filter(classificacao => classificacao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ classificacao_enquadramento: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setClassificacoesEnquadramento(classificacoesEnquadramento.map(classificacao =>
      classificacao.id === id ? { ...classificacao, ativo: !classificacao.ativo } : classificacao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Classificação de Enquadramento</h1>
          <p>Gerenciamento de classificações de enquadramento do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Classificação de Enquadramento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Classificação de Enquadramento' : 'Cadastrar Classificação de Enquadramento'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="classificacao_enquadramento">Classificação de Enquadramento *</label>
                <input
                  type="text"
                  id="classificacao_enquadramento"
                  value={formData.classificacao_enquadramento}
                  onChange={(e) => setFormData({...formData, classificacao_enquadramento: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a classificação de enquadramento"
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
              placeholder="Pesquisar classificações de enquadramento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredClassificacoesEnquadramento.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Classificação de Enquadramento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClassificacoesEnquadramento.map(classificacao => (
                <tr key={classificacao.id}>
                  <td>{classificacao.id}</td>
                  <td>{classificacao.classificacao_enquadramento}</td>
                  <td>
                    <Toggle
                      checked={classificacao.ativo}
                      onChange={() => handleToggleStatus(classificacao.id)}
                      id={`toggle-${classificacao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(classificacao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(classificacao.id)}
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
          
          {filteredClassificacoesEnquadramento.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma classificação de enquadramento encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova classificação de enquadramento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassificacaoEnquadramento;