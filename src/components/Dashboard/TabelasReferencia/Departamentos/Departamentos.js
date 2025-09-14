import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDepartamento, setEditingDepartamento] = useState(null);
  const [formData, setFormData] = useState({
    departamento: '',
    sigla: '',
    responsavel: '',
    ativo: true
  });

  // Dados mockados
  const mockDepartamentos = [
    { id: 1, departamento: 'Departamento de Licenciamento Ambiental', sigla: 'DLA', responsavel: 'João Silva', ativo: true },
    { id: 2, departamento: 'Departamento de Fiscalização', sigla: 'DFIS', responsavel: 'Maria Santos', ativo: true },
    { id: 3, departamento: 'Departamento de Monitoramento', sigla: 'DMON', responsavel: 'Carlos Oliveira', ativo: true },
    { id: 4, departamento: 'Departamento de Educação Ambiental', sigla: 'DEA', responsavel: 'Ana Costa', ativo: true },
    { id: 5, departamento: 'Departamento Jurídico', sigla: 'DJUR', responsavel: 'Pedro Almeida', ativo: true },
    { id: 6, departamento: 'Departamento Administrativo', sigla: 'DADM', responsavel: 'Lucia Ferreira', ativo: false },
    { id: 7, departamento: 'Departamento de Recursos Hídricos', sigla: 'DRH', responsavel: 'Roberto Lima', ativo: true },
    { id: 8, departamento: 'Departamento de Gestão de Resíduos', sigla: 'DGR', responsavel: 'Sandra Rocha', ativo: true }
  ];

  useEffect(() => {
    setDepartamentos(mockDepartamentos);
    setFilteredDepartamentos(mockDepartamentos);
  }, []);

  useEffect(() => {
    const filtered = departamentos.filter(departamento =>
      departamento.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      departamento.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      departamento.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartamentos(filtered);
  }, [searchTerm, departamentos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDepartamento) {
      setDepartamentos(prev => prev.map(departamento => 
        departamento.id === editingDepartamento.id 
          ? { ...departamento, ...formData }
          : departamento
      ));
    } else {
      const newDepartamento = {
        id: Math.max(...departamentos.map(d => d.id)) + 1,
        ...formData
      };
      setDepartamentos(prev => [...prev, newDepartamento]);
    }
    
    resetForm();
  };

  const handleEdit = (departamento) => {
    setEditingDepartamento(departamento);
    setFormData({
      departamento: departamento.departamento,
      sigla: departamento.sigla,
      responsavel: departamento.responsavel,
      ativo: departamento.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este departamento?')) {
      setDepartamentos(prev => prev.filter(departamento => departamento.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      departamento: '',
      sigla: '',
      responsavel: '',
      ativo: true
    });
    setEditingDepartamento(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setDepartamentos(prev => prev.map(departamento => 
      departamento.id === id 
        ? { ...departamento, ativo: !departamento.ativo }
        : departamento
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Departamentos</h1>
          <p>Gerenciamento de departamentos do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Departamento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingDepartamento ? 'Editar Departamento' : 'Cadastrar Departamento'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="departamento">Nome do Departamento *</label>
                <input
                  type="text"
                  id="departamento"
                  value={formData.departamento}
                  onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o nome do departamento"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sigla">Sigla *</label>
                <input
                  type="text"
                  id="sigla"
                  value={formData.sigla}
                  onChange={(e) => setFormData({...formData, sigla: e.target.value.toUpperCase()})}
                  required
                  maxLength={10}
                  placeholder="Digite a sigla"
                />
              </div>

              <div className="form-group">
                <label htmlFor="responsavel">Responsável</label>
                <input
                  type="text"
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                  maxLength={100}
                  placeholder="Digite o nome do responsável"
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
                  {editingDepartamento ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar departamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredDepartamentos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Departamento</th>
                <th>Sigla</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartamentos.map(departamento => (
                <tr key={departamento.id}>
                  <td>{departamento.id}</td>
                  <td>{departamento.departamento}</td>
                  <td>
                    <span className="sigla-badge">{departamento.sigla}</span>
                  </td>
                  <td>{departamento.responsavel}</td>
                  <td>
                    <Toggle
                      checked={departamento.ativo}
                      onChange={() => handleToggleStatus(departamento.id)}
                      id={`toggle-${departamento.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(departamento)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(departamento.id)}
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
          
          {filteredDepartamentos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum departamento encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo departamento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Departamentos;