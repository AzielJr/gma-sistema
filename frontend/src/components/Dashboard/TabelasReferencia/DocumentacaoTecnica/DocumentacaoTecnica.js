import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const DocumentacaoTecnica = () => {
  const [documentacoesTecnicas, setDocumentacoesTecnicas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    prazo: '',
    documentacao_tecnica: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockDocumentacoesTecnicas = [
    { id: 1, prazo: 45, documentacao_tecnica: 'Projeto Técnico de Instalação', ativo: true },
    { id: 2, prazo: 30, documentacao_tecnica: 'Memorial Descritivo do Processo', ativo: true },
    { id: 3, prazo: 60, documentacao_tecnica: 'Planta Baixa das Instalações', ativo: true },
    { id: 4, prazo: 90, documentacao_tecnica: 'Estudo de Viabilidade Técnica', ativo: true },
    { id: 5, prazo: 15, documentacao_tecnica: 'Laudo Técnico de Segurança', ativo: true },
    { id: 6, prazo: 120, documentacao_tecnica: 'Projeto de Controle de Poluição', ativo: false }
  ];

  useEffect(() => {
    setDocumentacoesTecnicas(mockDocumentacoesTecnicas);
  }, []);

  const filteredDocumentacoesTecnicas = documentacoesTecnicas.filter(doc =>
    doc.documentacao_tecnica.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setDocumentacoesTecnicas(documentacoesTecnicas.map(doc =>
        doc.id === editingId ? { ...formData, id: editingId, prazo: parseInt(formData.prazo) } : doc
      ));
    } else {
      const newId = Math.max(...documentacoesTecnicas.map(d => d.id), 0) + 1;
      setDocumentacoesTecnicas([...documentacoesTecnicas, { ...formData, id: newId, prazo: parseInt(formData.prazo) }]);
    }
    
    resetForm();
  };

  const handleEdit = (doc) => {
    setFormData({
      prazo: doc.prazo.toString(),
      documentacao_tecnica: doc.documentacao_tecnica,
      ativo: doc.ativo
    });
    setEditingId(doc.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta documentação técnica?')) {
      setDocumentacoesTecnicas(documentacoesTecnicas.filter(doc => doc.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ prazo: '', documentacao_tecnica: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setDocumentacoesTecnicas(documentacoesTecnicas.map(doc =>
      doc.id === id ? { ...doc, ativo: !doc.ativo } : doc
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Documentação Técnica</h1>
          <p>Gerenciamento de documentações técnicas do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Documentação Técnica
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Documentação Técnica' : 'Cadastrar Documentação Técnica'}</h2>
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
                <label htmlFor="documentacao_tecnica">Documentação Técnica *</label>
                <textarea
                  id="documentacao_tecnica"
                  value={formData.documentacao_tecnica}
                  onChange={(e) => setFormData({...formData, documentacao_tecnica: e.target.value})}
                  required
                  rows="4"
                  placeholder="Digite a descrição da documentação técnica"
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
              placeholder="Pesquisar documentações técnicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredDocumentacoesTecnicas.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prazo (dias)</th>
                <th>Documentação Técnica</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocumentacoesTecnicas.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.prazo}</td>
                  <td>{doc.documentacao_tecnica}</td>
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
          
          {filteredDocumentacoesTecnicas.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma documentação técnica encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova documentação técnica.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentacaoTecnica;