import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const TiposLicenca = () => {
  const [tiposLicenca, setTiposLicenca] = useState([]);
  const [filteredTiposLicenca, setFilteredTiposLicenca] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTipoLicenca, setEditingTipoLicenca] = useState(null);
  const [formData, setFormData] = useState({
    validade: '',
    aplica: '',
    ref: '',
    aplicavel: true,
    texto_padrao: true,
    ativo: true
  });

  // Dados mockados
  const mockTiposLicenca = [
    { 
      id: 1, 
      validade: 365, 
      aplica: 'Licença Prévia para atividades de baixo impacto', 
      ref: 1001, 
      aplicavel: true, 
      texto_padrao: true, 
      ativo: true 
    },
    { 
      id: 2, 
      validade: 730, 
      aplica: 'Licença de Instalação para indústrias', 
      ref: 1002, 
      aplicavel: true, 
      texto_padrao: false, 
      ativo: true 
    },
    { 
      id: 3, 
      validade: 1095, 
      aplica: 'Licença de Operação para atividades de médio porte', 
      ref: 1003, 
      aplicavel: true, 
      texto_padrao: true, 
      ativo: true 
    },
    { 
      id: 4, 
      validade: 180, 
      aplica: 'Licença Simplificada para microempresas', 
      ref: 1004, 
      aplicavel: false, 
      texto_padrao: false, 
      ativo: false 
    },
    { 
      id: 5, 
      validade: 1460, 
      aplica: 'Licença Ambiental Única para grandes empreendimentos', 
      ref: 1005, 
      aplicavel: true, 
      texto_padrao: true, 
      ativo: true 
    }
  ];

  useEffect(() => {
    setTiposLicenca(mockTiposLicenca);
    setFilteredTiposLicenca(mockTiposLicenca);
  }, []);

  useEffect(() => {
    const filtered = tiposLicenca.filter(tipo =>
      tipo.aplica.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tipo.ref.toString().includes(searchTerm) ||
      tipo.validade.toString().includes(searchTerm)
    );
    setFilteredTiposLicenca(filtered);
  }, [searchTerm, tiposLicenca]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTipoLicenca) {
      setTiposLicenca(prev => prev.map(tipo => 
        tipo.id === editingTipoLicenca.id 
          ? { 
              ...tipo, 
              ...formData, 
              validade: parseInt(formData.validade),
              ref: parseInt(formData.ref)
            }
          : tipo
      ));
    } else {
      const newTipoLicenca = {
        id: Math.max(...tiposLicenca.map(t => t.id)) + 1,
        ...formData,
        validade: parseInt(formData.validade),
        ref: parseInt(formData.ref)
      };
      setTiposLicenca(prev => [...prev, newTipoLicenca]);
    }
    
    resetForm();
  };

  const handleEdit = (tipoLicenca) => {
    setEditingTipoLicenca(tipoLicenca);
    setFormData({
      validade: tipoLicenca.validade.toString(),
      aplica: tipoLicenca.aplica,
      ref: tipoLicenca.ref.toString(),
      aplicavel: tipoLicenca.aplicavel,
      texto_padrao: tipoLicenca.texto_padrao,
      ativo: tipoLicenca.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo de licença?')) {
      setTiposLicenca(prev => prev.filter(tipo => tipo.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      validade: '',
      aplica: '',
      ref: '',
      aplicavel: true,
      texto_padrao: true,
      ativo: true
    });
    setEditingTipoLicenca(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setTiposLicenca(prev => prev.map(tipo => 
      tipo.id === id 
        ? { ...tipo, ativo: !tipo.ativo }
        : tipo
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Tipos de Licença</h1>
          <p>Gerenciamento de tipos de licenças ambientais</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Tipo de Licença
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingTipoLicenca ? 'Editar Tipo de Licença' : 'Cadastrar Tipo de Licença'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Licença *</label>
                <input
                  type="text"
                  id="tipo"
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  required
                  maxLength={100}
                  placeholder="Digite o tipo de licença"
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
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  rows={3}
                  maxLength={500}
                  placeholder="Digite a descrição do tipo de licença"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prazo_validade">Prazo de Validade (anos)</label>
                <input
                  type="number"
                  id="prazo_validade"
                  value={formData.prazo_validade}
                  onChange={(e) => setFormData({...formData, prazo_validade: e.target.value})}
                  min="1"
                  max="50"
                  placeholder="Digite o prazo em anos"
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
                  {editingTipoLicenca ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar tipos de licença..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredTiposLicenca.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Sigla</th>
                <th>Descrição</th>
                <th>Prazo (anos)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTiposLicenca.map(tipo => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.tipo}</td>
                  <td>
                    <span className="sigla-badge">{tipo.sigla}</span>
                  </td>
                  <td className="contexto-cell">{tipo.descricao}</td>
                  <td>
                    {tipo.prazo_validade && (
                      <span className="prazo-badge">{tipo.prazo_validade} anos</span>
                    )}
                  </td>
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
          
          {filteredTiposLicenca.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum tipo de licença encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo tipo de licença.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiposLicenca;