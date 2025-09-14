import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const AtividadesCNAE = () => {
  const [atividades, setAtividades] = useState([]);
  const [filteredAtividades, setFilteredAtividades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAtividade, setEditingAtividade] = useState(null);
  const [formData, setFormData] = useState({
    secao: '',
    divisao: '',
    grupo: '',
    classe: '',
    subclasse: '',
    dig: '',
    ret: '',
    nomeclatura: '',
    ativo: true
  });

  // Dados mockados
  const mockAtividades = [
    { 
      id: 1, 
      secao: 'A', 
      divisao: '01', 
      grupo: '011', 
      classe: '0111', 
      subclasse: '01111', 
      dig: '1', 
      ret: 'R01', 
      nomeclatura: 'Cultivo de cereais', 
      ativo: true 
    },
    { 
      id: 2, 
      secao: 'B', 
      divisao: '05', 
      grupo: '051', 
      classe: '0510', 
      subclasse: '05101', 
      dig: '2', 
      ret: 'R02', 
      nomeclatura: 'Extração de carvão mineral', 
      ativo: true 
    },
    { 
      id: 3, 
      secao: 'C', 
      divisao: '10', 
      grupo: '101', 
      classe: '1011', 
      subclasse: '10111', 
      dig: '3', 
      ret: 'R03', 
      nomeclatura: 'Frigorífico - abate de bovinos', 
      ativo: false 
    },
    { 
      id: 4, 
      secao: 'D', 
      divisao: '35', 
      grupo: '351', 
      classe: '3511', 
      subclasse: '35111', 
      dig: '4', 
      ret: 'R04', 
      nomeclatura: 'Geração de energia elétrica', 
      ativo: true 
    },
    { 
      id: 5, 
      secao: 'F', 
      divisao: '41', 
      grupo: '411', 
      classe: '4110', 
      subclasse: '41107', 
      dig: '5', 
      ret: 'R05', 
      nomeclatura: 'Desenvolvimento de projetos habitacionais', 
      ativo: true 
    }
  ];

  useEffect(() => {
    setAtividades(mockAtividades);
    setFilteredAtividades(mockAtividades);
  }, []);

  useEffect(() => {
    const filtered = atividades.filter(atividade =>
      atividade.nomeclatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atividade.secao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atividade.classe.includes(searchTerm)
    );
    setFilteredAtividades(filtered);
  }, [searchTerm, atividades]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAtividade) {
      setAtividades(prev => prev.map(atividade => 
        atividade.id === editingAtividade.id 
          ? { ...atividade, ...formData }
          : atividade
      ));
    } else {
      const newAtividade = {
        id: Math.max(...atividades.map(a => a.id)) + 1,
        ...formData
      };
      setAtividades(prev => [...prev, newAtividade]);
    }
    
    resetForm();
  };

  const handleEdit = (atividade) => {
    setEditingAtividade(atividade);
    setFormData({
      secao: atividade.secao,
      divisao: atividade.divisao,
      grupo: atividade.grupo,
      classe: atividade.classe,
      subclasse: atividade.subclasse,
      dig: atividade.dig,
      ret: atividade.ret,
      nomeclatura: atividade.nomeclatura,
      ativo: atividade.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade CNAE?')) {
      setAtividades(prev => prev.filter(atividade => atividade.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      subclasse: '',
      dig: '',
      ret: '',
      nomeclatura: '',
      ativo: true
    });
    setEditingAtividade(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setAtividades(prev => prev.map(atividade => 
      atividade.id === id 
        ? { ...atividade, ativo: !atividade.ativo }
        : atividade
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Atividades CNAE</h1>
          <p>Gerenciamento de atividades da Classificação Nacional de Atividades Econômicas</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Atividade
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container large-form">
            <div className="form-header">
              <h2>{editingAtividade ? 'Editar Atividade CNAE' : 'Cadastrar Atividade CNAE'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="secao">Seção *</label>
                  <input
                    type="text"
                    id="secao"
                    value={formData.secao}
                    onChange={(e) => setFormData({...formData, secao: e.target.value.toUpperCase()})}
                    required
                    maxLength={1}
                    placeholder="Ex: A"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="divisao">Divisão *</label>
                  <input
                    type="text"
                    id="divisao"
                    value={formData.divisao}
                    onChange={(e) => setFormData({...formData, divisao: e.target.value})}
                    required
                    maxLength={2}
                    placeholder="Ex: 01"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="grupo">Grupo *</label>
                  <input
                    type="text"
                    id="grupo"
                    value={formData.grupo}
                    onChange={(e) => setFormData({...formData, grupo: e.target.value})}
                    required
                    maxLength={3}
                    placeholder="Ex: 011"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="classe">Classe *</label>
                  <input
                    type="text"
                    id="classe"
                    value={formData.classe}
                    onChange={(e) => setFormData({...formData, classe: e.target.value})}
                    required
                    maxLength={5}
                    placeholder="Ex: 01111"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subclasse">Subclasse *</label>
                  <input
                    type="text"
                    id="subclasse"
                    value={formData.subclasse}
                    onChange={(e) => setFormData({...formData, subclasse: e.target.value})}
                    required
                    maxLength={7}
                    placeholder="Ex: 0111101"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição da Atividade *</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="Digite a descrição da atividade CNAE"
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
                  {editingAtividade ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar atividades CNAE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredAtividades.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Seção</th>
                <th>Divisão</th>
                <th>Grupo</th>
                <th>Classe</th>
                <th>Subclasse</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAtividades.map(atividade => (
                <tr key={atividade.id}>
                  <td>{atividade.id}</td>
                  <td>
                    <span className="cnae-badge secao">{atividade.secao}</span>
                  </td>
                  <td>
                    <span className="cnae-badge divisao">{atividade.divisao}</span>
                  </td>
                  <td>
                    <span className="cnae-badge grupo">{atividade.grupo}</span>
                  </td>
                  <td>
                    <span className="cnae-badge classe">{atividade.classe}</span>
                  </td>
                  <td>
                    <span className="cnae-badge subclasse">{atividade.subclasse}</span>
                  </td>
                  <td className="atividade-cell">{atividade.descricao}</td>
                  <td>
                    <Toggle
                      checked={atividade.ativo}
                      onChange={() => handleToggleStatus(atividade.id)}
                      id={`toggle-${atividade.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(atividade)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(atividade.id)}
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
          
          {filteredAtividades.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma atividade CNAE encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova atividade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtividadesCNAE;