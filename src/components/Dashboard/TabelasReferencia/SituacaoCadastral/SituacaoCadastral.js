import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const SituacaoCadastral = () => {
  const [situacoesCadastrais, setSituacoesCadastrais] = useState([]);
  const [filteredSituacoesCadastrais, setFilteredSituacoesCadastrais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSituacaoCadastral, setEditingSituacaoCadastral] = useState(null);
  const [formData, setFormData] = useState({
    situacao: '',
    descricao: '',
    ativo: true
  });

  // Dados mockados
  const mockSituacoesCadastrais = [
    { id: 1, situacao: 'Ativo', descricao: 'Cadastro ativo e regular', ativo: true },
    { id: 2, situacao: 'Inativo', descricao: 'Cadastro temporariamente inativo', ativo: true },
    { id: 3, situacao: 'Suspenso', descricao: 'Cadastro suspenso por irregularidades', ativo: true },
    { id: 4, situacao: 'Cancelado', descricao: 'Cadastro cancelado definitivamente', ativo: true },
    { id: 5, situacao: 'Pendente', descricao: 'Cadastro aguardando documentação', ativo: true },
    { id: 6, situacao: 'Em Análise', descricao: 'Cadastro em processo de análise', ativo: true },
    { id: 7, situacao: 'Bloqueado', descricao: 'Cadastro bloqueado por determinação judicial', ativo: false },
    { id: 8, situacao: 'Renovação', descricao: 'Cadastro em processo de renovação', ativo: true }
  ];

  useEffect(() => {
    setSituacoesCadastrais(mockSituacoesCadastrais);
    setFilteredSituacoesCadastrais(mockSituacoesCadastrais);
  }, []);

  useEffect(() => {
    const filtered = situacoesCadastrais.filter(situacao =>
      situacao.situacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      situacao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSituacoesCadastrais(filtered);
  }, [searchTerm, situacoesCadastrais]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSituacaoCadastral) {
      setSituacoesCadastrais(prev => prev.map(situacao => 
        situacao.id === editingSituacaoCadastral.id 
          ? { ...situacao, ...formData }
          : situacao
      ));
    } else {
      const newSituacaoCadastral = {
        id: Math.max(...situacoesCadastrais.map(s => s.id)) + 1,
        ...formData
      };
      setSituacoesCadastrais(prev => [...prev, newSituacaoCadastral]);
    }
    
    resetForm();
  };

  const handleEdit = (situacaoCadastral) => {
    setEditingSituacaoCadastral(situacaoCadastral);
    setFormData({
      situacao: situacaoCadastral.situacao,
      descricao: situacaoCadastral.descricao,
      ativo: situacaoCadastral.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta situação cadastral?')) {
      setSituacoesCadastrais(prev => prev.filter(situacao => situacao.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      situacao: '',
      descricao: '',
      ativo: true
    });
    setEditingSituacaoCadastral(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setSituacoesCadastrais(prev => prev.map(situacao => 
      situacao.id === id 
        ? { ...situacao, ativo: !situacao.ativo }
        : situacao
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Situação Cadastral</h1>
          <p>Gerenciamento de situações cadastrais do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Situação
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingSituacaoCadastral ? 'Editar Situação Cadastral' : 'Cadastrar Situação Cadastral'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="situacao">Situação *</label>
                <input
                  type="text"
                  id="situacao"
                  value={formData.situacao}
                  onChange={(e) => setFormData({...formData, situacao: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite a situação cadastral"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Digite a descrição da situação"
                  rows="4"
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
                  {editingSituacaoCadastral ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar situações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredSituacoesCadastrais.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Situação</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSituacoesCadastrais.map(situacao => (
                <tr key={situacao.id}>
                  <td>{situacao.id}</td>
                  <td>{situacao.situacao}</td>
                  <td className="contexto-cell">{situacao.descricao}</td>
                  <td>
                    <Toggle
                      checked={situacao.ativo}
                      onChange={() => handleToggleStatus(situacao.id)}
                      id={`toggle-${situacao.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(situacao)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(situacao.id)}
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSituacoesCadastrais.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma situação encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova situação.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SituacaoCadastral;