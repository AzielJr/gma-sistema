import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const InvestimentoUFM = () => {
  const [investimentos, setInvestimentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nomeclatura: '',
    sigla: '',
    faixa: '',
    de: '',
    ate: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockInvestimentos = [
    { id: 1, nomeclatura: 'Micro Empresa', sigla: 'ME', faixa: 'Até R$ 360.000,00', de: 0, ate: 360000, ativo: true },
    { id: 2, nomeclatura: 'Pequena Empresa', sigla: 'PE', faixa: 'De R$ 360.000,01 a R$ 4.800.000,00', de: 360001, ate: 4800000, ativo: true },
    { id: 3, nomeclatura: 'Média Empresa', sigla: 'MDE', faixa: 'De R$ 4.800.000,01 a R$ 300.000.000,00', de: 4800001, ate: 300000000, ativo: true },
    { id: 4, nomeclatura: 'Grande Empresa', sigla: 'GE', faixa: 'Acima de R$ 300.000.000,00', de: 300000001, ate: 999999999, ativo: true },
    { id: 5, nomeclatura: 'Empresa Especial', sigla: 'EE', faixa: 'Casos específicos', de: 0, ate: 0, ativo: false }
  ];

  useEffect(() => {
    setInvestimentos(mockInvestimentos);
  }, []);

  const filteredInvestimentos = investimentos.filter(investimento =>
    investimento.nomeclatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investimento.sigla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setInvestimentos(investimentos.map(investimento =>
        investimento.id === editingId ? { 
          ...formData, 
          id: editingId, 
          de: parseInt(formData.de) || 0,
          ate: parseInt(formData.ate) || 0
        } : investimento
      ));
    } else {
      const newId = Math.max(...investimentos.map(i => i.id), 0) + 1;
      setInvestimentos([...investimentos, { 
        ...formData, 
        id: newId, 
        de: parseInt(formData.de) || 0,
        ate: parseInt(formData.ate) || 0
      }]);
    }
    
    resetForm();
  };

  const handleEdit = (investimento) => {
    setFormData({
      nomeclatura: investimento.nomeclatura,
      sigla: investimento.sigla,
      faixa: investimento.faixa,
      de: investimento.de.toString(),
      ate: investimento.ate.toString(),
      ativo: investimento.ativo
    });
    setEditingId(investimento.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este investimento em UFM?')) {
      setInvestimentos(investimentos.filter(investimento => investimento.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ nomeclatura: '', sigla: '', faixa: '', de: '', ate: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setInvestimentos(investimentos.map(investimento =>
      investimento.id === id ? { ...investimento, ativo: !investimento.ativo } : investimento
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Investimento em UFM</h1>
          <p>Gerenciamento de investimentos em UFM do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Investimento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Investimento em UFM' : 'Cadastrar Investimento em UFM'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="nomeclatura">Nomenclatura *</label>
                <textarea
                  id="nomeclatura"
                  value={formData.nomeclatura}
                  onChange={(e) => setFormData({...formData, nomeclatura: e.target.value})}
                  required
                  rows={2}
                  placeholder="Digite a nomenclatura"
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
                <label htmlFor="faixa">Faixa *</label>
                <textarea
                  id="faixa"
                  value={formData.faixa}
                  onChange={(e) => setFormData({...formData, faixa: e.target.value})}
                  required
                  rows={2}
                  placeholder="Digite a faixa"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="de">De *</label>
                  <input
                    type="number"
                    id="de"
                    value={formData.de}
                    onChange={(e) => setFormData({...formData, de: e.target.value})}
                    required
                    min="0"
                    placeholder="Valor inicial"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ate">Até *</label>
                  <input
                    type="number"
                    id="ate"
                    value={formData.ate}
                    onChange={(e) => setFormData({...formData, ate: e.target.value})}
                    required
                    min="0"
                    placeholder="Valor final"
                  />
                </div>
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
              placeholder="Pesquisar investimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredInvestimentos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nomenclatura</th>
                <th>Sigla</th>
                <th>Faixa</th>
                <th>De</th>
                <th>Até</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestimentos.map(investimento => (
                <tr key={investimento.id}>
                  <td>{investimento.id}</td>
                  <td>{investimento.nomeclatura}</td>
                  <td>{investimento.sigla}</td>
                  <td>{investimento.faixa}</td>
                  <td>{investimento.de.toLocaleString()}</td>
                  <td>{investimento.ate.toLocaleString()}</td>
                  <td>
                    <Toggle
                      checked={investimento.ativo}
                      onChange={() => handleToggleStatus(investimento.id)}
                      id={`toggle-${investimento.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(investimento)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(investimento.id)}
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
          
          {filteredInvestimentos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum investimento encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo investimento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestimentoUFM;