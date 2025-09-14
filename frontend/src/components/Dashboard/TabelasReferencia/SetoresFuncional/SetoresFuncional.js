import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const SetoresFuncional = () => {
  const [setoresFuncional, setSetoresFuncional] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    setor: '',
    ativo: true
  });

  // Dados mockados para demonstração
  const mockSetoresFuncional = [
    { id: 1, setor: 'Recursos Humanos', ativo: true },
    { id: 2, setor: 'Tecnologia da Informação', ativo: true },
    { id: 3, setor: 'Financeiro', ativo: true },
    { id: 4, setor: 'Jurídico', ativo: true },
    { id: 5, setor: 'Meio Ambiente', ativo: true },
    { id: 6, setor: 'Administrativo', ativo: false }
  ];

  useEffect(() => {
    setSetoresFuncional(mockSetoresFuncional);
  }, []);

  const filteredSetoresFuncional = setoresFuncional.filter(setor =>
    setor.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setSetoresFuncional(setoresFuncional.map(setor =>
        setor.id === editingId ? { ...formData, id: editingId } : setor
      ));
    } else {
      const newId = Math.max(...setoresFuncional.map(s => s.id), 0) + 1;
      setSetoresFuncional([...setoresFuncional, { ...formData, id: newId }]);
    }
    
    resetForm();
  };

  const handleEdit = (setor) => {
    setFormData({
      setor: setor.setor,
      ativo: setor.ativo
    });
    setEditingId(setor.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este setor funcional?')) {
      setSetoresFuncional(setoresFuncional.filter(setor => setor.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ setor: '', ativo: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setSetoresFuncional(setoresFuncional.map(setor =>
      setor.id === id ? { ...setor, ativo: !setor.ativo } : setor
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Setores Funcional</h1>
          <p>Gerenciamento de setores funcionais do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Setor Funcional
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingId ? 'Editar Setor Funcional' : 'Cadastrar Setor Funcional'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="setor">Setor *</label>
                <input
                  type="text"
                  id="setor"
                  value={formData.setor}
                  onChange={(e) => setFormData({...formData, setor: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome do setor"
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
              placeholder="Pesquisar setores funcionais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredSetoresFuncional.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Setor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSetoresFuncional.map(setor => (
                <tr key={setor.id}>
                  <td>{setor.id}</td>
                  <td>{setor.setor}</td>
                  <td>
                    <Toggle
                      checked={setor.ativo}
                      onChange={() => handleToggleStatus(setor.id)}
                      id={`toggle-${setor.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(setor)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(setor.id)}
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
          
          {filteredSetoresFuncional.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum setor funcional encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo setor funcional.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetoresFuncional;