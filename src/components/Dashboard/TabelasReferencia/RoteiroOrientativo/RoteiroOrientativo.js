import React, { useState, useEffect } from 'react';
import './RoteiroOrientativo.css';

const RoteiroOrientativo = () => {
  // Dados mockados para demonstração
  const mockRoteiros = [
    {
      id: 1,
      modalidade: 'Básico',
      orgao_referencia: 'SEMAM',
      classificacao: 'Classe A',
      subclasse: {
        id: 1,
        secao: 'G',
        divisao: '47',
        grupo: '471',
        classe: '4711',
        subclasse: '47113',
        digito: '0',
        referencia: 'REF001',
        nomeclatura_atividade: 'Comércio varejista de mercadorias em geral'
      },
      roteiro: {
        roteiro: 'ROT001',
        codigo_ref: 'COD001',
        orgao: 'SEMAM',
        tipo_modalidade: 'Básico',
        subclasse: '47113',
        digito: '0',
        nomeclatura_atividade: 'Comércio varejista de mercadorias em geral',
        ativo: true
      },
      documentacao_basica: [
        {
          id: 1,
          prazo: '30 dias',
          documentacao_basica: 'Contrato Social',
          ativo: true
        },
        {
          id: 2,
          prazo: '15 dias',
          documentacao_basica: 'Cartão CNPJ',
          ativo: true
        }
      ],
      documentacao_tecnica: [
        {
          id: 1,
          prazo: '45 dias',
          documentacao_tecnica: 'Projeto Técnico',
          ativo: true
        }
      ],
      projetos: [
        {
          id: 1,
          prazo: '60 dias',
          projeto: 'Projeto Arquitetônico',
          ativo: true
        }
      ],
      diretrizes: [
        {
          id: 1,
          prazo: '30 dias',
          diretriz: 'Diretriz Ambiental',
          ativo: true
        }
      ],
      ativo: true
    }
  ];

  const [roteiros, setRoteiros] = useState(mockRoteiros);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRoteiro, setEditingRoteiro] = useState(null);
  const [activeTab, setActiveTab] = useState('identificacao');
  const [formData, setFormData] = useState({
    modalidade: '',
    orgao_referencia: '',
    classificacao: '',
    subclasse: {
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      subclasse: '',
      digito: '',
      referencia: '',
      nomeclatura_atividade: ''
    },
    roteiro: {
      roteiro: '',
      codigo_ref: '',
      orgao: '',
      tipo_modalidade: '',
      subclasse: '',
      digito: '',
      nomeclatura_atividade: '',
      ativo: true
    },
    documentacao_basica: [
      {
        prazo: '',
        documentacao_basica: '',
        ativo: true
      }
    ],
    documentacao_tecnica: [
      {
        prazo: '',
        documentacao_tecnica: '',
        ativo: true
      }
    ],
    projetos: [
      {
        prazo: '',
        projeto: '',
        ativo: true
      }
    ],
    diretrizes: [
      {
        prazo: '',
        diretriz: '',
        ativo: true
      }
    ],
    ativo: true
  });

  useEffect(() => {
    setRoteiros(mockRoteiros);
  }, []);

  const filteredRoteiros = roteiros.filter(roteiro =>
    roteiro.modalidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roteiro.orgao_referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roteiro.classificacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roteiro.roteiro.roteiro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRoteiro) {
      setRoteiros(roteiros.map(roteiro => 
        roteiro.id === editingRoteiro.id 
          ? { ...formData, id: editingRoteiro.id }
          : roteiro
      ));
    } else {
      const newRoteiro = {
        ...formData,
        id: Math.max(...roteiros.map(r => r.id)) + 1
      };
      setRoteiros([...roteiros, newRoteiro]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      modalidade: '',
      orgao_referencia: '',
      classificacao: '',
      subclasse: {
        secao: '',
        divisao: '',
        grupo: '',
        classe: '',
        subclasse: '',
        digito: '',
        referencia: '',
        nomeclatura_atividade: ''
      },
      roteiro: {
        roteiro: '',
        codigo_ref: '',
        orgao: '',
        tipo_modalidade: '',
        subclasse: '',
        digito: '',
        nomeclatura_atividade: '',
        ativo: true
      },
      documentacao_basica: [
        {
          prazo: '',
          documentacao_basica: '',
          ativo: true
        }
      ],
      documentacao_tecnica: [
        {
          prazo: '',
          documentacao_tecnica: '',
          ativo: true
        }
      ],
      projetos: [
        {
          prazo: '',
          projeto: '',
          ativo: true
        }
      ],
      diretrizes: [
        {
          prazo: '',
          diretriz: '',
          ativo: true
        }
      ],
      ativo: true
    });
    setEditingRoteiro(null);
    setShowModal(false);
    setActiveTab('identificacao');
  };

  const handleEdit = (roteiro) => {
    setFormData(roteiro);
    setEditingRoteiro(roteiro);
    setShowModal(true);
    setActiveTab('identificacao');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este roteiro orientativo?')) {
      setRoteiros(roteiros.filter(roteiro => roteiro.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setRoteiros(roteiros.map(roteiro => 
      roteiro.id === id 
        ? { ...roteiro, ativo: !roteiro.ativo }
        : roteiro
    ));
  };

  const addDocumentacao = (tipo) => {
    const newItem = {
      prazo: '',
      ativo: true
    };
    
    if (tipo === 'basica') {
      newItem.documentacao_basica = '';
      setFormData({
        ...formData,
        documentacao_basica: [...formData.documentacao_basica, newItem]
      });
    } else if (tipo === 'tecnica') {
      newItem.documentacao_tecnica = '';
      setFormData({
        ...formData,
        documentacao_tecnica: [...formData.documentacao_tecnica, newItem]
      });
    } else if (tipo === 'projetos') {
      newItem.projeto = '';
      setFormData({
        ...formData,
        projetos: [...formData.projetos, newItem]
      });
    } else if (tipo === 'diretrizes') {
      newItem.diretriz = '';
      setFormData({
        ...formData,
        diretrizes: [...formData.diretrizes, newItem]
      });
    }
  };

  const removeDocumentacao = (tipo, index) => {
    if (tipo === 'basica') {
      const newItems = formData.documentacao_basica.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        documentacao_basica: newItems.length > 0 ? newItems : [{ prazo: '', documentacao_basica: '', ativo: true }]
      });
    } else if (tipo === 'tecnica') {
      const newItems = formData.documentacao_tecnica.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        documentacao_tecnica: newItems.length > 0 ? newItems : [{ prazo: '', documentacao_tecnica: '', ativo: true }]
      });
    } else if (tipo === 'projetos') {
      const newItems = formData.projetos.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        projetos: newItems.length > 0 ? newItems : [{ prazo: '', projeto: '', ativo: true }]
      });
    } else if (tipo === 'diretrizes') {
      const newItems = formData.diretrizes.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        diretrizes: newItems.length > 0 ? newItems : [{ prazo: '', diretriz: '', ativo: true }]
      });
    }
  };

  const updateDocumentacao = (tipo, index, field, value) => {
    if (tipo === 'basica') {
      const newItems = [...formData.documentacao_basica];
      newItems[index] = { ...newItems[index], [field]: value };
      setFormData({ ...formData, documentacao_basica: newItems });
    } else if (tipo === 'tecnica') {
      const newItems = [...formData.documentacao_tecnica];
      newItems[index] = { ...newItems[index], [field]: value };
      setFormData({ ...formData, documentacao_tecnica: newItems });
    } else if (tipo === 'projetos') {
      const newItems = [...formData.projetos];
      newItems[index] = { ...newItems[index], [field]: value };
      setFormData({ ...formData, projetos: newItems });
    } else if (tipo === 'diretrizes') {
      const newItems = [...formData.diretrizes];
      newItems[index] = { ...newItems[index], [field]: value };
      setFormData({ ...formData, diretrizes: newItems });
    }
  };

  return (
    <div className="roteiro-orientativo-container">
      <div className="page-header">
        <h1>Roteiro Orientativo</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Novo Roteiro
        </button>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por modalidade, órgão, classificação ou roteiro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Modalidade</th>
                <th>Órgão Referência</th>
                <th>Classificação</th>
                <th>Roteiro</th>
                <th>Subclasse</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoteiros.map(roteiro => (
                <tr key={roteiro.id}>
                  <td>{roteiro.id}</td>
                  <td>{roteiro.modalidade}</td>
                  <td>{roteiro.orgao_referencia}</td>
                  <td>{roteiro.classificacao}</td>
                  <td>{roteiro.roteiro.roteiro}</td>
                  <td>{roteiro.subclasse.subclasse}</td>
                  <td>
                    <button
                      className={`status-toggle ${roteiro.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(roteiro.id)}
                    >
                      {roteiro.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(roteiro)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(roteiro.id)}
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
              <h2>{editingRoteiro ? 'Editar Roteiro Orientativo' : 'Novo Roteiro Orientativo'}</h2>
              <button className="close-button" onClick={resetForm}>×</button>
            </div>

            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'identificacao' ? 'active' : ''}`}
                  onClick={() => setActiveTab('identificacao')}
                >
                  Identificação do Roteiro
                </button>
                <button 
                  className={`tab-button ${activeTab === 'doc-basica' ? 'active' : ''}`}
                  onClick={() => setActiveTab('doc-basica')}
                >
                  Documentação Básica
                </button>
                <button 
                  className={`tab-button ${activeTab === 'doc-tecnica' ? 'active' : ''}`}
                  onClick={() => setActiveTab('doc-tecnica')}
                >
                  Documentação Técnica
                </button>
                <button 
                  className={`tab-button ${activeTab === 'projetos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projetos')}
                >
                  Projetos
                </button>
                <button 
                  className={`tab-button ${activeTab === 'diretrizes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('diretrizes')}
                >
                  Diretrizes
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Aba Identificação do Roteiro */}
                {activeTab === 'identificacao' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Dados Básicos</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Modalidade *</label>
                          <input
                            type="text"
                            value={formData.modalidade}
                            onChange={(e) => setFormData({...formData, modalidade: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Órgão Referência *</label>
                          <input
                            type="text"
                            value={formData.orgao_referencia}
                            onChange={(e) => setFormData({...formData, orgao_referencia: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Classificação *</label>
                          <input
                            type="text"
                            value={formData.classificacao}
                            onChange={(e) => setFormData({...formData, classificacao: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Subclasse</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Seção</label>
                          <input
                            type="text"
                            value={formData.subclasse.secao}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, secao: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Divisão</label>
                          <input
                            type="text"
                            value={formData.subclasse.divisao}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, divisao: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Grupo</label>
                          <input
                            type="text"
                            value={formData.subclasse.grupo}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, grupo: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Classe</label>
                          <input
                            type="text"
                            value={formData.subclasse.classe}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, classe: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Subclasse</label>
                          <input
                            type="text"
                            value={formData.subclasse.subclasse}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, subclasse: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Dígito</label>
                          <input
                            type="text"
                            value={formData.subclasse.digito}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, digito: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Referência</label>
                          <input
                            type="text"
                            value={formData.subclasse.referencia}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, referencia: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Nomenclatura da Atividade</label>
                          <input
                            type="text"
                            value={formData.subclasse.nomeclatura_atividade}
                            onChange={(e) => setFormData({
                              ...formData, 
                              subclasse: { ...formData.subclasse, nomeclatura_atividade: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Roteiros</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Roteiro</label>
                          <input
                            type="text"
                            value={formData.roteiro.roteiro}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, roteiro: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Código Ref</label>
                          <input
                            type="text"
                            value={formData.roteiro.codigo_ref}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, codigo_ref: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Órgão</label>
                          <input
                            type="text"
                            value={formData.roteiro.orgao}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, orgao: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Tipo Modalidade</label>
                          <input
                            type="text"
                            value={formData.roteiro.tipo_modalidade}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, tipo_modalidade: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Subclasse</label>
                          <input
                            type="text"
                            value={formData.roteiro.subclasse}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, subclasse: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Dígito</label>
                          <input
                            type="text"
                            value={formData.roteiro.digito}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, digito: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group full-width">
                          <label>Nomenclatura da Atividade</label>
                          <input
                            type="text"
                            value={formData.roteiro.nomeclatura_atividade}
                            onChange={(e) => setFormData({
                              ...formData, 
                              roteiro: { ...formData.roteiro, nomeclatura_atividade: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Documentação Básica */}
                {activeTab === 'doc-basica' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Documentação Básica</h3>
                        <button type="button" className="btn-add" onClick={() => addDocumentacao('basica')}>
                          Adicionar Documentação
                        </button>
                      </div>
                      
                      {formData.documentacao_basica.map((doc, index) => (
                        <div key={index} className="doc-card">
                          <div className="doc-header">
                            <h4>Documentação {index + 1}</h4>
                            {formData.documentacao_basica.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeDocumentacao('basica', index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Prazo</label>
                              <input
                                type="text"
                                value={doc.prazo}
                                onChange={(e) => updateDocumentacao('basica', index, 'prazo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Documentação Básica</label>
                              <input
                                type="text"
                                value={doc.documentacao_basica}
                                onChange={(e) => updateDocumentacao('basica', index, 'documentacao_basica', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select
                                value={doc.ativo}
                                onChange={(e) => updateDocumentacao('basica', index, 'ativo', e.target.value === 'true')}
                              >
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aba Documentação Técnica */}
                {activeTab === 'doc-tecnica' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Documentação Técnica</h3>
                        <button type="button" className="btn-add" onClick={() => addDocumentacao('tecnica')}>
                          Adicionar Documentação
                        </button>
                      </div>
                      
                      {formData.documentacao_tecnica.map((doc, index) => (
                        <div key={index} className="doc-card">
                          <div className="doc-header">
                            <h4>Documentação {index + 1}</h4>
                            {formData.documentacao_tecnica.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeDocumentacao('tecnica', index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Prazo</label>
                              <input
                                type="text"
                                value={doc.prazo}
                                onChange={(e) => updateDocumentacao('tecnica', index, 'prazo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Documentação Técnica</label>
                              <input
                                type="text"
                                value={doc.documentacao_tecnica}
                                onChange={(e) => updateDocumentacao('tecnica', index, 'documentacao_tecnica', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select
                                value={doc.ativo}
                                onChange={(e) => updateDocumentacao('tecnica', index, 'ativo', e.target.value === 'true')}
                              >
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aba Projetos */}
                {activeTab === 'projetos' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Projetos</h3>
                        <button type="button" className="btn-add" onClick={() => addDocumentacao('projetos')}>
                          Adicionar Projeto
                        </button>
                      </div>
                      
                      {formData.projetos.map((projeto, index) => (
                        <div key={index} className="doc-card">
                          <div className="doc-header">
                            <h4>Projeto {index + 1}</h4>
                            {formData.projetos.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeDocumentacao('projetos', index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Prazo</label>
                              <input
                                type="text"
                                value={projeto.prazo}
                                onChange={(e) => updateDocumentacao('projetos', index, 'prazo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Projeto</label>
                              <input
                                type="text"
                                value={projeto.projeto}
                                onChange={(e) => updateDocumentacao('projetos', index, 'projeto', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select
                                value={projeto.ativo}
                                onChange={(e) => updateDocumentacao('projetos', index, 'ativo', e.target.value === 'true')}
                              >
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aba Diretrizes */}
                {activeTab === 'diretrizes' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Diretrizes</h3>
                        <button type="button" className="btn-add" onClick={() => addDocumentacao('diretrizes')}>
                          Adicionar Diretriz
                        </button>
                      </div>
                      
                      {formData.diretrizes.map((diretriz, index) => (
                        <div key={index} className="doc-card">
                          <div className="doc-header">
                            <h4>Diretriz {index + 1}</h4>
                            {formData.diretrizes.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeDocumentacao('diretrizes', index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Prazo</label>
                              <input
                                type="text"
                                value={diretriz.prazo}
                                onChange={(e) => updateDocumentacao('diretrizes', index, 'prazo', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Diretriz</label>
                              <input
                                type="text"
                                value={diretriz.diretriz}
                                onChange={(e) => updateDocumentacao('diretrizes', index, 'diretriz', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select
                                value={diretriz.ativo}
                                onChange={(e) => updateDocumentacao('diretrizes', index, 'ativo', e.target.value === 'true')}
                              >
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                              </select>
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
                    {editingRoteiro ? 'Atualizar' : 'Salvar'}
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

export default RoteiroOrientativo;