import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const TiposDocumentos = () => {
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tipo_documento: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockTiposDocumentos = [
    { id: 1, tipo_documento: 'Certidão de Nascimento', ativo: true },
    { id: 2, tipo_documento: 'Carteira de Identidade', ativo: true },
    { id: 3, tipo_documento: 'Cadastro de Pessoa Física', ativo: true },
    { id: 4, tipo_documento: 'Carteira Nacional de Habilitação', ativo: true },
    { id: 5, tipo_documento: 'Passaporte', ativo: true },
    { id: 6, tipo_documento: 'Título de Eleitor', ativo: false }
  ];

  useEffect(() => {
    setTiposDocumentos(mockTiposDocumentos);
  }, []);

  const filteredTiposDocumentos = tiposDocumentos.filter(tipo =>
    tipo.tipo_documento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setTiposDocumentos(tiposDocumentos.map(tipo =>
        tipo.id === editingId ? { ...formData, id: editingId } : tipo
      ));
    } else {
      const newId = Math.max(...tiposDocumentos.map(t => t.id), 0) + 1;
      setTiposDocumentos([...tiposDocumentos, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (tipo) => {
    setFormData({
      tipo_documento: tipo.tipo_documento,
      ativo: tipo.ativo
    });
    setEditingId(tipo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo de documento?')) {
      setTiposDocumentos(tiposDocumentos.filter(tipo => tipo.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ tipo_documento: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setTiposDocumentos(tiposDocumentos.map(tipo =>
      tipo.id === id ? { ...tipo, ativo: !tipo.ativo } : tipo
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Tipos de Documentos</h1>
          <p>Gerenciamento de tipos de documentos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Tipo de Documento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Tipo de Documento' : 'Cadastrar Tipo de Documento'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="tipo_documento">Tipo de Documento *</label>
                <input
                  type="text"
                  id="tipo_documento"
                  value={formData.tipo_documento}
                  onChange={(e) => setFormData({...formData, tipo_documento: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o tipo de documento"
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
              placeholder="Pesquisar tipos de documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredTiposDocumentos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de Documento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTiposDocumentos.map(tipo => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.tipo_documento}</td>
                  <td>
                    <Toggle
                      checked={tipo.ativo}
                      onChange={() => handleToggleStatus(tipo.id)}
                      id={`toggle-${tipo.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(tipo)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(tipo.id)}
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
          
          {filteredTiposDocumentos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum tipo de documento encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo tipo de documento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiposDocumentos;