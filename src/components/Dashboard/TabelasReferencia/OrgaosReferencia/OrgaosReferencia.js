import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const OrgaosReferencia = () => {
  const [orgaosReferencia, setOrgaosReferencia] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    orgao_referencia: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockOrgaosReferencia = [
    { id: 1, orgao_referencia: 'Ministério da Saúde', ativo: true },
    { id: 2, orgao_referencia: 'ANVISA', ativo: true },
    { id: 3, orgao_referencia: 'IBAMA', ativo: true },
    { id: 4, orgao_referencia: 'Receita Federal', ativo: true },
    { id: 5, orgao_referencia: 'Ministério do Trabalho', ativo: true },
    { id: 6, orgao_referencia: 'INSS', ativo: false }
  ];

  useEffect(() => {
    setOrgaosReferencia(mockOrgaosReferencia);
  }, []);

  const filteredOrgaosReferencia = orgaosReferencia.filter(orgao =>
    orgao.orgao_referencia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setOrgaosReferencia(orgaosReferencia.map(orgao =>
        orgao.id === editingId ? { ...formData, id: editingId } : orgao
      ));
    } else {
      const newId = Math.max(...orgaosReferencia.map(o => o.id), 0) + 1;
      setOrgaosReferencia([...orgaosReferencia, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (orgao) => {
    setFormData({
      orgao_referencia: orgao.orgao_referencia,
      ativo: orgao.ativo
    });
    setEditingId(orgao.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este órgão de referência?')) {
      setOrgaosReferencia(orgaosReferencia.filter(orgao => orgao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ orgao_referencia: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setOrgaosReferencia(orgaosReferencia.map(orgao =>
      orgao.id === id ? { ...orgao, ativo: !orgao.ativo } : orgao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Órgãos de Referência</h1>
          <p>Gerenciamento de órgãos de referência do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Órgão de Referência
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Órgão de Referência' : 'Cadastrar Órgão de Referência'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="orgao_referencia">Órgão de Referência *</label>
                <input
                  type="text"
                  id="orgao_referencia"
                  value={formData.orgao_referencia}
                  onChange={(e) => setFormData({...formData, orgao_referencia: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o órgão de referência"
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
              placeholder="Pesquisar órgãos de referência..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredOrgaosReferencia.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Órgão de Referência</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgaosReferencia.map(orgao => (
                <tr key={orgao.id}>
                  <td>{orgao.id}</td>
                  <td>{orgao.orgao_referencia}</td>
                  <td>
                    <Toggle
                      checked={orgao.ativo}
                      onChange={() => handleToggleStatus(orgao.id)}
                      id={`toggle-${orgao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(orgao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(orgao.id)}
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
          
          {filteredOrgaosReferencia.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum órgão de referência encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo órgão de referência.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgaosReferencia;