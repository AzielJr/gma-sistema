import React, { useState, useEffect } from 'react';
import './AtividadeSecundaria.css';

const AtividadeSecundaria = () => {
  // Dados mockados para demonstração
  const mockAtividades = [
    {
      id: 1,
      dados_contribuinte: {
        cnpj_cpf: '12.345.678/0001-90',
        razao_social: 'Empresa Exemplo Ltda',
        nome_fantasia: 'Exemplo Corp'
      },
      atividade_principal: {
        codigo: '4711-3/01',
        descricao: 'Comércio varejista de mercadorias em geral'
      },
      classificacao_atividade: {
        codigo: '4711-3/01',
        secao: 'G',
        divisao: '47',
        grupo: '471',
        classe: '4711',
        sub_classe: '47113',
        digito: '01',
        referencia: 'REF001',
        modalidade: 'basico',
        orgao_referencia: 1
      },
      atividades_secundarias: [
        {
          id: 1,
          sub_classe: '47121',
          nomeclatura_atividade: 'Comércio varejista de produtos farmacêuticos',
          codigo: '4712-1/00',
          secao: 'G',
          divisao: '47',
          grupo: '471',
          classe: '4712',
          digito: '00',
          referencia: 'REF002'
        },
        {
          id: 2,
          sub_classe: '47130',
          nomeclatura_atividade: 'Comércio varejista de combustíveis',
          codigo: '4713-0/01',
          secao: 'G',
          divisao: '47',
          grupo: '471',
          classe: '4713',
          digito: '01',
          referencia: 'REF003'
        }
      ],
      ativo: true
    }
  ];

  const [atividades, setAtividades] = useState(mockAtividades);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAtividade, setEditingAtividade] = useState(null);
  const [activeTab, setActiveTab] = useState('dados-contribuinte');
  const [formData, setFormData] = useState({
    dados_contribuinte: {
      cnpj_cpf: '',
      razao_social: '',
      nome_fantasia: ''
    },
    atividade_principal: {
      codigo: '',
      descricao: ''
    },
    classificacao_atividade: {
      codigo: '',
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      sub_classe: '',
      digito: '',
      referencia: '',
      modalidade: '',
      orgao_referencia: ''
    },
    atividades_secundarias: [
      {
        sub_classe: '',
        nomeclatura_atividade: '',
        codigo: '',
        secao: '',
        divisao: '',
        grupo: '',
        classe: '',
        digito: '',
        referencia: ''
      }
    ],
    ativo: true
  });

  useEffect(() => {
    setAtividades(mockAtividades);
  }, []);

  const filteredAtividades = atividades.filter(atividade =>
    atividade.dados_contribuinte.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atividade.dados_contribuinte.cnpj_cpf.includes(searchTerm) ||
    atividade.dados_contribuinte.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atividade.classificacao_atividade.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAtividade) {
      setAtividades(atividades.map(atividade => 
        atividade.id === editingAtividade.id 
          ? { ...formData, id: editingAtividade.id }
          : atividade
      ));
    } else {
      const newAtividade = {
        ...formData,
        id: Math.max(...atividades.map(a => a.id)) + 1
      };
      setAtividades([...atividades, newAtividade]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      dados_contribuinte: {
        cnpj_cpf: '',
        razao_social: '',
        nome_fantasia: ''
      },
      atividade_principal: {
        codigo: '',
        descricao: ''
      },
      classificacao_atividade: {
        codigo: '',
        secao: '',
        divisao: '',
        grupo: '',
        classe: '',
        sub_classe: '',
        digito: '',
        referencia: '',
        modalidade: '',
        orgao_referencia: ''
      },
      atividades_secundarias: [
        {
          sub_classe: '',
          nomeclatura_atividade: '',
          codigo: '',
          secao: '',
          divisao: '',
          grupo: '',
          classe: '',
          digito: '',
          referencia: ''
        }
      ],
      ativo: true
    });
    setEditingAtividade(null);
    setShowModal(false);
    setActiveTab('dados-contribuinte');
  };

  const handleEdit = (atividade) => {
    setFormData(atividade);
    setEditingAtividade(atividade);
    setShowModal(true);
    setActiveTab('dados-contribuinte');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade secundária?')) {
      setAtividades(atividades.filter(atividade => atividade.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setAtividades(atividades.map(atividade => 
      atividade.id === id 
        ? { ...atividade, ativo: !atividade.ativo }
        : atividade
    ));
  };

  const updateNestedField = (path, value) => {
    const keys = path.split('.');
    const newFormData = { ...formData };
    let current = newFormData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFormData(newFormData);
  };

  const addAtividadeSecundaria = () => {
    const newAtividade = {
      sub_classe: '',
      nomeclatura_atividade: '',
      codigo: '',
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      digito: '',
      referencia: ''
    };
    
    setFormData({
      ...formData,
      atividades_secundarias: [...formData.atividades_secundarias, newAtividade]
    });
  };

  const removeAtividadeSecundaria = (index) => {
    const newAtividades = formData.atividades_secundarias.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      atividades_secundarias: newAtividades.length > 0 ? newAtividades : [
        {
          sub_classe: '',
          nomeclatura_atividade: '',
          codigo: '',
          secao: '',
          divisao: '',
          grupo: '',
          classe: '',
          digito: '',
          referencia: ''
        }
      ]
    });
  };

  const updateAtividadeSecundaria = (index, field, value) => {
    const newAtividades = [...formData.atividades_secundarias];
    newAtividades[index] = { ...newAtividades[index], [field]: value };
    setFormData({ ...formData, atividades_secundarias: newAtividades });
  };

  return (
    <div className="atividade-secundaria-container">
      <div className="page-header">
        <h1>Atividade Secundária</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Nova Atividade
        </button>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por razão social, CNPJ/CPF, nome fantasia ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>CNPJ/CPF</th>
                <th>Razão Social</th>
                <th>Nome Fantasia</th>
                <th>Código Atividade</th>
                <th>Modalidade</th>
                <th>Qtd. Ativ. Secundárias</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAtividades.map(atividade => (
                <tr key={atividade.id}>
                  <td>{atividade.id}</td>
                  <td>{atividade.dados_contribuinte.cnpj_cpf}</td>
                  <td>{atividade.dados_contribuinte.razao_social}</td>
                  <td>{atividade.dados_contribuinte.nome_fantasia}</td>
                  <td>{atividade.classificacao_atividade.codigo}</td>
                  <td>
                    <span className={`modalidade-badge ${atividade.classificacao_atividade.modalidade}`}>
                      {atividade.classificacao_atividade.modalidade}
                    </span>
                  </td>
                  <td>{atividade.atividades_secundarias.length}</td>
                  <td>
                    <button
                      className={`status-toggle ${atividade.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(atividade.id)}
                    >
                      {atividade.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(atividade)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(atividade.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h2>{editingAtividade ? 'Editar Atividade Secundária' : 'Nova Atividade Secundária'}</h2>
              <button className="close-button" onClick={resetForm}>×</button>
            </div>

            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'dados-contribuinte' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dados-contribuinte')}
                >
                  Dados do Contribuinte
                </button>
                <button 
                  className={`tab-button ${activeTab === 'atividade-principal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atividade-principal')}
                >
                  Atividade Principal
                </button>
                <button 
                  className={`tab-button ${activeTab === 'classificacao' ? 'active' : ''}`}
                  onClick={() => setActiveTab('classificacao')}
                >
                  Classificação da Atividade
                </button>
                <button 
                  className={`tab-button ${activeTab === 'atividades-secundarias' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atividades-secundarias')}
                >
                  Atividades Secundárias
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Aba Dados do Contribuinte */}
                {activeTab === 'dados-contribuinte' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Dados do Contribuinte</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>CNPJ/CPF *</label>
                          <input
                            type="text"
                            value={formData.dados_contribuinte.cnpj_cpf}
                            onChange={(e) => updateNestedField('dados_contribuinte.cnpj_cpf', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Razão Social *</label>
                          <input
                            type="text"
                            value={formData.dados_contribuinte.razao_social}
                            onChange={(e) => updateNestedField('dados_contribuinte.razao_social', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Nome Fantasia</label>
                          <input
                            type="text"
                            value={formData.dados_contribuinte.nome_fantasia}
                            onChange={(e) => updateNestedField('dados_contribuinte.nome_fantasia', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Atividade Principal */}
                {activeTab === 'atividade-principal' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Atividade Principal</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Código *</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.codigo}
                            onChange={(e) => updateNestedField('atividade_principal.codigo', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Descrição *</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.descricao}
                            onChange={(e) => updateNestedField('atividade_principal.descricao', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Classificação da Atividade */}
                {activeTab === 'classificacao' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Classificação da Atividade</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Código *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.codigo}
                            onChange={(e) => updateNestedField('classificacao_atividade.codigo', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Seção *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.secao}
                            onChange={(e) => updateNestedField('classificacao_atividade.secao', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Divisão *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.divisao}
                            onChange={(e) => updateNestedField('classificacao_atividade.divisao', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Grupo *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.grupo}
                            onChange={(e) => updateNestedField('classificacao_atividade.grupo', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Classe *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.classe}
                            onChange={(e) => updateNestedField('classificacao_atividade.classe', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Sub-classe *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.sub_classe}
                            onChange={(e) => updateNestedField('classificacao_atividade.sub_classe', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Dígito *</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.digito}
                            onChange={(e) => updateNestedField('classificacao_atividade.digito', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Referência</label>
                          <input
                            type="text"
                            value={formData.classificacao_atividade.referencia}
                            onChange={(e) => updateNestedField('classificacao_atividade.referencia', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Modalidade *</label>
                          <select
                            value={formData.classificacao_atividade.modalidade}
                            onChange={(e) => updateNestedField('classificacao_atividade.modalidade', e.target.value)}
                            required
                          >
                            <option value="">Selecione...</option>
                            <option value="basico">Básico</option>
                            <option value="padrao">Padrão</option>
                            <option value="simplificado">Simplificado</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Órgão Referência *</label>
                          <input
                            type="number"
                            value={formData.classificacao_atividade.orgao_referencia}
                            onChange={(e) => updateNestedField('classificacao_atividade.orgao_referencia', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Atividades Secundárias Associadas */}
                {activeTab === 'atividades-secundarias' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Atividades Secundárias Associadas</h3>
                        <button type="button" className="btn-add" onClick={addAtividadeSecundaria}>
                          Adicionar Atividade
                        </button>
                      </div>
                      
                      {formData.atividades_secundarias.map((atividade, index) => (
                        <div key={index} className="atividade-card">
                          <div className="atividade-header">
                            <h4>Atividade Secundária {index + 1}</h4>
                            {formData.atividades_secundarias.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeAtividadeSecundaria(index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Sub-classe</label>
                              <input
                                type="text"
                                value={atividade.sub_classe}
                                onChange={(e) => updateAtividadeSecundaria(index, 'sub_classe', e.target.value)}
                              />
                            </div>
                            <div className="form-group full-width">
                              <label>Nomenclatura da Atividade</label>
                              <input
                                type="text"
                                value={atividade.nomeclatura_atividade}
                                onChange={(e) => updateAtividadeSecundaria(index, 'nomeclatura_atividade', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Código</label>
                              <input
                                type="text"
                                value={atividade.codigo}
                                onChange={(e) => updateAtividadeSecundaria(index, 'codigo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Seção</label>
                              <input
                                type="text"
                                value={atividade.secao}
                                onChange={(e) => updateAtividadeSecundaria(index, 'secao', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Divisão</label>
                              <input
                                type="text"
                                value={atividade.divisao}
                                onChange={(e) => updateAtividadeSecundaria(index, 'divisao', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Grupo</label>
                              <input
                                type="text"
                                value={atividade.grupo}
                                onChange={(e) => updateAtividadeSecundaria(index, 'grupo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Classe</label>
                              <input
                                type="text"
                                value={atividade.classe}
                                onChange={(e) => updateAtividadeSecundaria(index, 'classe', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Dígito</label>
                              <input
                                type="text"
                                value={atividade.digito}
                                onChange={(e) => updateAtividadeSecundaria(index, 'digito', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Referência</label>
                              <input
                                type="text"
                                value={atividade.referencia}
                                onChange={(e) => updateAtividadeSecundaria(index, 'referencia', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingAtividade ? 'Atualizar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtividadeSecundaria;