import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const DocumentacaoBasica = () => {
  const [documentacoesBasicas, setDocumentacoesBasicas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    prazo: '',
    documentacao_basica: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockDocumentacoesBasicas = [
    { id: 1, prazo: 30, documentacao_basica: 'Certidão de Uso e Ocupação do Solo', ativo: true },
    { id: 2, prazo: 15, documentacao_basica: 'Alvará de Funcionamento', ativo: true },
    { id: 3, prazo: 60, documentacao_basica: 'Licença Ambiental Prévia', ativo: true },
    { id: 4, prazo: 45, documentacao_basica: 'Estudo de Impacto Ambiental', ativo: true },
    { id: 5, prazo: 20, documentacao_basica: 'Plano de Controle Ambiental', ativo: true },
    { id: 6, prazo: 90, documentacao_basica: 'Relatório de Controle Ambiental', ativo: false }
  ];

  useEffect(() => {
    setDocumentacoesBasicas(mockDocumentacoesBasicas);
  }, []);

  const filteredDocumentacoesBasicas = documentacoesBasicas.filter(doc =>
    doc.documentacao_basica.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setDocumentacoesBasicas(documentacoesBasicas.map(doc =>
        doc.id === editingId ? { ...formData, id: editingId, prazo: parseInt(formData.prazo) } : doc
      ));
    } else {
      const newId = Math.max(...documentacoesBasicas.map(d => d.id), 0) + 1;
      setDocumentacoesBasicas([...documentacoesBasicas, { ...formData, id: newId, prazo: parseInt(formData.prazo) }]);
    }
    
    resetForm();
  };

  const handleEdit = (doc) => {
    setFormData({
      prazo: doc.prazo.toString(),
      documentacao_basica: doc.documentacao_basica,
      ativo: doc.ativo
    });
    setEditingId(doc.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta documentação básica?')) {
      setDocumentacoesBasicas(documentacoesBasicas.filter(doc => doc.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ prazo: '', documentacao_basica: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setDocumentacoesBasicas(documentacoesBasicas.map(doc =>
      doc.id === id ? { ...doc, ativo: !doc.ativo } : doc
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Documentação Básica</h1>
          <p>Gerenciamento de documentações básicas do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Documentação Básica
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Documentação Básica' : 'Cadastrar Documentação Básica'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="prazo">Prazo (dias) *</label>
                <input
                  type="number"
                  id="prazo"
                  value={formData.prazo}
                  onChange={(e) => setFormData({...formData, prazo: e.target.value})}
                  required
                  min="1"
                  placeholder="Digite o prazo em dias"
                />
              </div>

              <div className="form-group">
                <label htmlFor="documentacao_basica">Documentação Básica *</label>
                <textarea
                  id="documentacao_basica"
                  value={formData.documentacao_basica}
                  onChange={(e) => setFormData({...formData, documentacao_basica: e.target.value})}
                  required
                  rows="4"
                  placeholder="Digite a descrição da documentação básica"
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
              placeholder="Pesquisar documentações básicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredDocumentacoesBasicas.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prazo (dias)</th>
                <th>Documentação Básica</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocumentacoesBasicas.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.prazo}</td>
                  <td>{doc.documentacao_basica}</td>
                  <td>
                    <Toggle
                      checked={doc.ativo}
                      onChange={() => handleToggleStatus(doc.id)}
                      id={`toggle-${doc.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(doc)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(doc.id)}
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
          
          {filteredDocumentacoesBasicas.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma documentação básica encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova documentação básica.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentacaoBasica;