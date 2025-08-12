import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const FaixaLicenciamento = () => {
  const [faixasLicenciamento, setFaixasLicenciamento] = useState([]);
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
  const mockFaixasLicenciamento = [
    { id: 1, nomeclatura: 'Licenciamento Simplificado', sigla: 'LS', faixa: 'Baixo impacto ambiental', de: 0, ate: 100, ativo: true },
    { id: 2, nomeclatura: 'Licenciamento Ordinário', sigla: 'LO', faixa: 'Médio impacto ambiental', de: 101, ate: 500, ativo: true },
    { id: 3, nomeclatura: 'Licenciamento Especial', sigla: 'LE', faixa: 'Alto impacto ambiental', de: 501, ate: 1000, ativo: true },
    { id: 4, nomeclatura: 'Licenciamento Excepcional', sigla: 'LEX', faixa: 'Impacto ambiental excepcional', de: 1001, ate: 9999, ativo: true },
    { id: 5, nomeclatura: 'Licenciamento Temporário', sigla: 'LT', faixa: 'Atividades temporárias', de: 0, ate: 50, ativo: false }
  ];

  useEffect(() => {
    setFaixasLicenciamento(mockFaixasLicenciamento);
  }, []);

  const filteredFaixasLicenciamento = faixasLicenciamento.filter(faixa =>
    faixa.nomeclatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faixa.sigla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setFaixasLicenciamento(faixasLicenciamento.map(faixa =>
        faixa.id === editingId ? { 
          ...formData, 
          id: editingId, 
          de: parseInt(formData.de) || 0,
          ate: parseInt(formData.ate) || 0
        } : faixa
      ));
    } else {
      const newId = Math.max(...faixasLicenciamento.map(f => f.id), 0) + 1;
      setFaixasLicenciamento([...faixasLicenciamento, { 
        ...formData, 
        id: newId, 
        de: parseInt(formData.de) || 0,
        ate: parseInt(formData.ate) || 0
      }]);
    }
    
    resetForm();
  };

  const handleEdit = (faixa) => {
    setFormData({
      nomeclatura: faixa.nomeclatura,
      sigla: faixa.sigla,
      faixa: faixa.faixa,
      de: faixa.de.toString(),
      ate: faixa.ate.toString(),
      ativo: faixa.ativo
    });
    setEditingId(faixa.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta faixa de licenciamento?')) {
      setFaixasLicenciamento(faixasLicenciamento.filter(faixa => faixa.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ nomeclatura: '', sigla: '', faixa: '', de: '', ate: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setFaixasLicenciamento(faixasLicenciamento.map(faixa =>
      faixa.id === id ? { ...faixa, ativo: !faixa.ativo } : faixa
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Faixa de Licenciamento Municipal</h1>
          <p>Gerenciamento de faixas de licenciamento municipal do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Faixa
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Faixa de Licenciamento' : 'Cadastrar Faixa de Licenciamento'}</h2>
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
              placeholder="Pesquisar faixas de licenciamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredFaixasLicenciamento.length} registro(s) encontrado(s)</span>
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
              {filteredFaixasLicenciamento.map(faixa => (
                <tr key={faixa.id}>
                  <td>{faixa.id}</td>
                  <td>{faixa.nomeclatura}</td>
                  <td>{faixa.sigla}</td>
                  <td>{faixa.faixa}</td>
                  <td>{faixa.de}</td>
                  <td>{faixa.ate}</td>
                  <td>
                    <Toggle
                      checked={faixa.ativo}
                      onChange={() => handleToggleStatus(faixa.id)}
                      id={`toggle-${faixa.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(faixa)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(faixa.id)}
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
          
          {filteredFaixasLicenciamento.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma faixa de licenciamento encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova faixa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaixaLicenciamento;