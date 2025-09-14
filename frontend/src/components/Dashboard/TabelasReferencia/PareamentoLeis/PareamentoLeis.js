import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';
import './PareamentoLeis.css';

const PareamentoLeis = () => {
  const [pareamentos, setPareamentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('principal');
  const [formData, setFormData] = useState({
    // Aba Principal
    classificacao: '',
    orgao: '',
    grau: '',
    atividade: '',
    codigo: '',
    secao: '',
    divisao: '',
    grupo: '',
    classe: '',
    subclasse: '',
    digito: '',
    referencia: '',
    // Aba Análise Geral
    area: '',
    unidade_medida: '',
    investimento: '',
    grau_poluidor_porte: '',
    quadro_funcional: '',
    tipo_enquadra: '',
    enquadramento: '',
    potencial_forte_poluidor: '',
    faixa_licenciamento_micro: '',
    faixa_licenciamento_pequeno: '',
    faixa_licenciamento_medio: '',
    faixa_licenciamento_grande: '',
    faixa_licenciamento_especial: '',
    ativo: true
  });

  // Dados mockados
  const mockPareamentos = [
    { 
      id: 1,
      classificacao: 1,
      orgao: 1,
      grau: 'Alto',
      atividade: 'Indústria Química',
      codigo: 2011,
      secao: 2,
      divisao: 20,
      grupo: 201,
      classe: 2011,
      subclasse: 20111,
      digito: 1,
      referencia: 1,
      area: 'Área Industrial',
      unidade_medida: 'm²',
      investimento: 'Alto',
      grau_poluidor_porte: 'Grande Porte',
      quadro_funcional: '50-100 funcionários',
      tipo_enquadra: 'Licença Prévia',
      enquadramento: 'Classe A',
      potencial_forte_poluidor: 'Sim',
      faixa_licenciamento_micro: 'Não se aplica',
      faixa_licenciamento_pequeno: 'Não se aplica',
      faixa_licenciamento_medio: 'Não se aplica',
      faixa_licenciamento_grande: 'Aplicável',
      faixa_licenciamento_especial: 'Não se aplica',
      ativo: true 
    },
    { 
      id: 2,
      classificacao: 2,
      orgao: 2,
      grau: 'Médio',
      atividade: 'Comércio Varejista',
      codigo: 4711,
      secao: 4,
      divisao: 47,
      grupo: 471,
      classe: 4711,
      subclasse: 47111,
      digito: 1,
      referencia: 2,
      area: 'Área Comercial',
      unidade_medida: 'm²',
      investimento: 'Médio',
      grau_poluidor_porte: 'Pequeno Porte',
      quadro_funcional: '10-20 funcionários',
      tipo_enquadra: 'Licença Simplificada',
      enquadramento: 'Classe B',
      potencial_forte_poluidor: 'Não',
      faixa_licenciamento_micro: 'Aplicável',
      faixa_licenciamento_pequeno: 'Aplicável',
      faixa_licenciamento_medio: 'Não se aplica',
      faixa_licenciamento_grande: 'Não se aplica',
      faixa_licenciamento_especial: 'Não se aplica',
      ativo: true 
    }
  ];

  const [filteredPareamentos, setFilteredPareamentos] = useState([]);

  useEffect(() => {
    setPareamentos(mockPareamentos);
    setFilteredPareamentos(mockPareamentos);
  }, []);

  useEffect(() => {
    const filtered = pareamentos.filter(pareamento =>
      pareamento.atividade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pareamento.grau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pareamento.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPareamentos(filtered);
  }, [searchTerm, pareamentos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setPareamentos(prev => prev.map(pareamento => 
        pareamento.id === editingId 
          ? { ...pareamento, ...formData }
          : pareamento
      ));
    } else {
      const newPareamento = {
        id: Math.max(...pareamentos.map(p => p.id), 0) + 1,
        ...formData
      };
      setPareamentos(prev => [...prev, newPareamento]);
    }
    
    resetForm();
  };

  const handleEdit = (pareamento) => {
    setEditingId(pareamento.id);
    setFormData({
      classificacao: pareamento.classificacao,
      orgao: pareamento.orgao,
      grau: pareamento.grau,
      atividade: pareamento.atividade,
      codigo: pareamento.codigo,
      secao: pareamento.secao,
      divisao: pareamento.divisao,
      grupo: pareamento.grupo,
      classe: pareamento.classe,
      subclasse: pareamento.subclasse,
      digito: pareamento.digito,
      referencia: pareamento.referencia,
      area: pareamento.area,
      unidade_medida: pareamento.unidade_medida,
      investimento: pareamento.investimento,
      grau_poluidor_porte: pareamento.grau_poluidor_porte,
      quadro_funcional: pareamento.quadro_funcional,
      tipo_enquadra: pareamento.tipo_enquadra,
      enquadramento: pareamento.enquadramento,
      potencial_forte_poluidor: pareamento.potencial_forte_poluidor,
      faixa_licenciamento_micro: pareamento.faixa_licenciamento_micro,
      faixa_licenciamento_pequeno: pareamento.faixa_licenciamento_pequeno,
      faixa_licenciamento_medio: pareamento.faixa_licenciamento_medio,
      faixa_licenciamento_grande: pareamento.faixa_licenciamento_grande,
      faixa_licenciamento_especial: pareamento.faixa_licenciamento_especial,
      ativo: pareamento.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pareamento?')) {
      setPareamentos(prev => prev.filter(pareamento => pareamento.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      classificacao: '',
      orgao: '',
      grau: '',
      atividade: '',
      codigo: '',
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      subclasse: '',
      digito: '',
      referencia: '',
      area: '',
      unidade_medida: '',
      investimento: '',
      grau_poluidor_porte: '',
      quadro_funcional: '',
      tipo_enquadra: '',
      enquadramento: '',
      potencial_forte_poluidor: '',
      faixa_licenciamento_micro: '',
      faixa_licenciamento_pequeno: '',
      faixa_licenciamento_medio: '',
      faixa_licenciamento_grande: '',
      faixa_licenciamento_especial: '',
      ativo: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setPareamentos(prev => prev.map(pareamento => 
      pareamento.id === id 
        ? { ...pareamento, ativo: !pareamento.ativo }
        : pareamento
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Pareamento de Leis</h1>
          <p>Gerenciamento de pareamento entre leis e regulamentações</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Pareamento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container pareamento-form">
            <div className="form-header">
              <h2>{editingId ? 'Editar Pareamento' : 'Cadastrar Pareamento'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  type="button"
                  className={`tab-button ${activeTab === 'principal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('principal')}
                >
                  Aba Principal
                </button>
                <button 
                  type="button"
                  className={`tab-button ${activeTab === 'analise' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analise')}
                >
                  Aba Análise Geral
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="form-content">
                {activeTab === 'principal' && (
                  <div className="tab-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="classificacao">Classificação *</label>
                        <input
                          type="number"
                          id="classificacao"
                          value={formData.classificacao}
                          onChange={(e) => setFormData({...formData, classificacao: e.target.value})}
                          required
                          placeholder="Digite a classificação"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="orgao">Órgão *</label>
                        <input
                          type="number"
                          id="orgao"
                          value={formData.orgao}
                          onChange={(e) => setFormData({...formData, orgao: e.target.value})}
                          required
                          placeholder="Digite o órgão"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="grau">Grau *</label>
                        <input
                          type="text"
                          id="grau"
                          value={formData.grau}
                          onChange={(e) => setFormData({...formData, grau: e.target.value})}
                          required
                          placeholder="Digite o grau"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="atividade">Atividade *</label>
                        <input
                          type="text"
                          id="atividade"
                          value={formData.atividade}
                          onChange={(e) => setFormData({...formData, atividade: e.target.value})}
                          required
                          placeholder="Digite a atividade"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="codigo">Código *</label>
                        <input
                          type="number"
                          id="codigo"
                          value={formData.codigo}
                          onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                          required
                          placeholder="Digite o código"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="secao">Seção *</label>
                        <input
                          type="number"
                          id="secao"
                          value={formData.secao}
                          onChange={(e) => setFormData({...formData, secao: e.target.value})}
                          required
                          placeholder="Digite a seção"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="divisao">Divisão *</label>
                        <input
                          type="number"
                          id="divisao"
                          value={formData.divisao}
                          onChange={(e) => setFormData({...formData, divisao: e.target.value})}
                          required
                          placeholder="Digite a divisão"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="grupo">Grupo *</label>
                        <input
                          type="number"
                          id="grupo"
                          value={formData.grupo}
                          onChange={(e) => setFormData({...formData, grupo: e.target.value})}
                          required
                          placeholder="Digite o grupo"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="classe">Classe *</label>
                        <input
                          type="number"
                          id="classe"
                          value={formData.classe}
                          onChange={(e) => setFormData({...formData, classe: e.target.value})}
                          required
                          placeholder="Digite a classe"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subclasse">Subclasse *</label>
                        <input
                          type="number"
                          id="subclasse"
                          value={formData.subclasse}
                          onChange={(e) => setFormData({...formData, subclasse: e.target.value})}
                          required
                          placeholder="Digite a subclasse"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="digito">Dígito *</label>
                        <input
                          type="number"
                          id="digito"
                          value={formData.digito}
                          onChange={(e) => setFormData({...formData, digito: e.target.value})}
                          required
                          placeholder="Digite o dígito"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="referencia">Referência *</label>
                        <input
                          type="number"
                          id="referencia"
                          value={formData.referencia}
                          onChange={(e) => setFormData({...formData, referencia: e.target.value})}
                          required
                          placeholder="Digite a referência"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analise' && (
                  <div className="tab-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="area">Área</label>
                        <textarea
                          id="area"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                          rows={2}
                          placeholder="Digite a área"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="unidade_medida">Unidade de Medida</label>
                        <input
                          type="text"
                          id="unidade_medida"
                          value={formData.unidade_medida}
                          onChange={(e) => setFormData({...formData, unidade_medida: e.target.value})}
                          placeholder="Digite a unidade de medida"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="investimento">Investimento</label>
                        <input
                          type="text"
                          id="investimento"
                          value={formData.investimento}
                          onChange={(e) => setFormData({...formData, investimento: e.target.value})}
                          placeholder="Digite o investimento"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="grau_poluidor_porte">Grau Poluidor Porte</label>
                        <input
                          type="text"
                          id="grau_poluidor_porte"
                          value={formData.grau_poluidor_porte}
                          onChange={(e) => setFormData({...formData, grau_poluidor_porte: e.target.value})}
                          placeholder="Digite o grau poluidor porte"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quadro_funcional">Quadro Funcional</label>
                        <input
                          type="text"
                          id="quadro_funcional"
                          value={formData.quadro_funcional}
                          onChange={(e) => setFormData({...formData, quadro_funcional: e.target.value})}
                          placeholder="Digite o quadro funcional"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tipo_enquadra">Tipo Enquadramento</label>
                        <input
                          type="text"
                          id="tipo_enquadra"
                          value={formData.tipo_enquadra}
                          onChange={(e) => setFormData({...formData, tipo_enquadra: e.target.value})}
                          placeholder="Digite o tipo de enquadramento"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="enquadramento">Enquadramento</label>
                        <input
                          type="text"
                          id="enquadramento"
                          value={formData.enquadramento}
                          onChange={(e) => setFormData({...formData, enquadramento: e.target.value})}
                          placeholder="Digite o enquadramento"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="potencial_forte_poluidor">Potencial Forte Poluidor</label>
                        <select
                          id="potencial_forte_poluidor"
                          value={formData.potencial_forte_poluidor}
                          onChange={(e) => setFormData({...formData, potencial_forte_poluidor: e.target.value})}
                        >
                          <option value="">Selecione</option>
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Faixas de Licenciamento</label>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="faixa_licenciamento_micro">Micro</label>
                          <input
                            type="text"
                            id="faixa_licenciamento_micro"
                            value={formData.faixa_licenciamento_micro}
                            onChange={(e) => setFormData({...formData, faixa_licenciamento_micro: e.target.value})}
                            placeholder="Faixa micro"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="faixa_licenciamento_pequeno">Pequeno</label>
                          <input
                            type="text"
                            id="faixa_licenciamento_pequeno"
                            value={formData.faixa_licenciamento_pequeno}
                            onChange={(e) => setFormData({...formData, faixa_licenciamento_pequeno: e.target.value})}
                            placeholder="Faixa pequeno"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="faixa_licenciamento_medio">Médio</label>
                          <input
                            type="text"
                            id="faixa_licenciamento_medio"
                            value={formData.faixa_licenciamento_medio}
                            onChange={(e) => setFormData({...formData, faixa_licenciamento_medio: e.target.value})}
                            placeholder="Faixa médio"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="faixa_licenciamento_grande">Grande</label>
                          <input
                            type="text"
                            id="faixa_licenciamento_grande"
                            value={formData.faixa_licenciamento_grande}
                            onChange={(e) => setFormData({...formData, faixa_licenciamento_grande: e.target.value})}
                            placeholder="Faixa grande"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="faixa_licenciamento_especial">Especial</label>
                          <input
                            type="text"
                            id="faixa_licenciamento_especial"
                            value={formData.faixa_licenciamento_especial}
                            onChange={(e) => setFormData({...formData, faixa_licenciamento_especial: e.target.value})}
                            placeholder="Faixa especial"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
              placeholder="Pesquisar pareamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredPareamentos.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Classificação</th>
                <th>Órgão</th>
                <th>Grau</th>
                <th>Atividade</th>
                <th>Código</th>
                <th>Área</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPareamentos.map(pareamento => (
                <tr key={pareamento.id}>
                  <td>{pareamento.id}</td>
                  <td>
                    <span className="codigo-badge">{pareamento.classificacao}</span>
                  </td>
                  <td>
                    <span className="codigo-badge">{pareamento.orgao}</span>
                  </td>
                  <td>
                    <span className="enquadramento-badge">{pareamento.grau}</span>
                  </td>
                  <td className="contexto-cell">{pareamento.atividade}</td>
                  <td>
                    <span className="codigo-badge">{pareamento.codigo}</span>
                  </td>
                  <td className="contexto-cell">{pareamento.area}</td>
                  <td>
                    <Toggle
                      checked={pareamento.ativo}
                      onChange={() => handleToggleStatus(pareamento.id)}
                      id={`toggle-${pareamento.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(pareamento)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(pareamento.id)}
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
          
          {filteredPareamentos.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum pareamento encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo pareamento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PareamentoLeis;