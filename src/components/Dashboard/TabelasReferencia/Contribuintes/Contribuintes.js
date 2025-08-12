import React, { useState, useEffect } from 'react';
import './Contribuintes.css';

const Contribuintes = () => {
  // Dados mockados para demonstração
  const mockContribuintes = [
    {
      id: 1,
      tipo_contribuinte: 1,
      cnpj: '12.345.678/0001-90',
      inscricao_municipal: '123456789',
      inscricao_estadual: '987654321',
      dnpm: '12345',
      situacao_cadastral: 'ativo',
      roteiro: 'ROT001',
      razao_social: 'Empresa ABC Ltda',
      nome_fantasia: 'ABC Comércio',
      endereco: 'Rua das Flores, 123',
      nucleo: 'Centro',
      tipo_logradouro: 'Rua',
      numero: '123',
      quadra: 'A',
      cidade: 'São Paulo',
      logradouro: 'das Flores',
      bairro: 'Centro',
      complemento: 'Sala 101',
      email_principal: 'contato@abc.com',
      email_alternativo: 'financeiro@abc.com',
      telefone: '(11) 1234-5678',
      cep: '01234-567',
      socios: [
        {
          nome: 'João Silva',
          cpf: '123.456.789-00',
          rg: '12.345.678-9',
          orgao_expedidor: 'SSP/SP',
          fone: '(11) 9876-5432',
          sexo: 'masculino'
        }
      ],
      atividade_principal: {
        secao: 'G',
        divisao: '47',
        grupo: '471',
        classe: '4711',
        subclasse: '47113',
        digito: '0',
        referencia: 'REF001',
        modalidade: 'basico',
        nomeclatura_atividade: 'Comércio varejista de mercadorias em geral'
      },
      empreendimento: {
        capital: '100000.00',
        area_total: '500.00',
        construida: '300.00',
        utilizada: '250.00',
        direto: '10',
        terceirizados: '5'
      },
      ativo: true
    },
    {
      id: 2,
      tipo_contribuinte: 2,
      cnpj: '98.765.432/0001-10',
      inscricao_municipal: '987654321',
      inscricao_estadual: '123456789',
      dnpm: '54321',
      situacao_cadastral: 'inativo',
      roteiro: 'ROT002',
      razao_social: 'Indústria XYZ S.A.',
      nome_fantasia: 'XYZ Industrial',
      endereco: 'Av. Industrial, 456',
      nucleo: 'Distrito Industrial',
      tipo_logradouro: 'Avenida',
      numero: '456',
      quadra: 'B',
      cidade: 'São Paulo',
      logradouro: 'Industrial',
      bairro: 'Distrito Industrial',
      complemento: 'Galpão 2',
      email_principal: 'contato@xyz.com',
      email_alternativo: 'vendas@xyz.com',
      telefone: '(11) 8765-4321',
      cep: '08765-432',
      socios: [
        {
          nome: 'Maria Santos',
          cpf: '987.654.321-00',
          rg: '98.765.432-1',
          orgao_expedidor: 'SSP/SP',
          fone: '(11) 5432-1098',
          sexo: 'feminino'
        }
      ],
      atividade_principal: {
        secao: 'C',
        divisao: '25',
        grupo: '251',
        classe: '2511',
        subclasse: '25113',
        digito: '5',
        referencia: 'REF002',
        modalidade: 'padrao',
        nomeclatura_atividade: 'Fabricação de estruturas metálicas'
      },
      empreendimento: {
        capital: '500000.00',
        area_total: '2000.00',
        construida: '1500.00',
        utilizada: '1200.00',
        direto: '50',
        terceirizados: '20'
      },
      ativo: false
    }
  ];

  const [contribuintes, setContribuintes] = useState(mockContribuintes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContribuinte, setEditingContribuinte] = useState(null);
  const [activeTab, setActiveTab] = useState('dados-cadastrais');
  const [formData, setFormData] = useState({
    tipo_contribuinte: '',
    cnpj: '',
    inscricao_municipal: '',
    inscricao_estadual: '',
    dnpm: '',
    situacao_cadastral: 'ativo',
    roteiro: '',
    razao_social: '',
    nome_fantasia: '',
    endereco: '',
    nucleo: '',
    tipo_logradouro: '',
    numero: '',
    quadra: '',
    cidade: '',
    logradouro: '',
    bairro: '',
    complemento: '',
    email_principal: '',
    email_alternativo: '',
    telefone: '',
    cep: '',
    socios: [
      {
        nome: '',
        cpf: '',
        rg: '',
        orgao_expedidor: '',
        fone: '',
        sexo: 'masculino'
      }
    ],
    atividade_principal: {
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      subclasse: '',
      digito: '',
      referencia: '',
      modalidade: 'basico',
      nomeclatura_atividade: ''
    },
    empreendimento: {
      capital: '',
      area_total: '',
      construida: '',
      utilizada: '',
      direto: '',
      terceirizados: ''
    },
    ativo: true
  });

  useEffect(() => {
    setContribuintes(mockContribuintes);
  }, []);

  const filteredContribuintes = contribuintes.filter(contribuinte =>
    contribuinte.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contribuinte.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contribuinte.cnpj.includes(searchTerm) ||
    contribuinte.inscricao_municipal.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingContribuinte) {
      setContribuintes(contribuintes.map(contribuinte => 
        contribuinte.id === editingContribuinte.id 
          ? { ...formData, id: editingContribuinte.id }
          : contribuinte
      ));
    } else {
      const newContribuinte = {
        ...formData,
        id: Math.max(...contribuintes.map(c => c.id)) + 1
      };
      setContribuintes([...contribuintes, newContribuinte]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      tipo_contribuinte: '',
      cnpj: '',
      inscricao_municipal: '',
      inscricao_estadual: '',
      dnpm: '',
      situacao_cadastral: 'ativo',
      roteiro: '',
      razao_social: '',
      nome_fantasia: '',
      endereco: '',
      nucleo: '',
      tipo_logradouro: '',
      numero: '',
      quadra: '',
      cidade: '',
      logradouro: '',
      bairro: '',
      complemento: '',
      email_principal: '',
      email_alternativo: '',
      telefone: '',
      cep: '',
      socios: [
        {
          nome: '',
          cpf: '',
          rg: '',
          orgao_expedidor: '',
          fone: '',
          sexo: 'masculino'
        }
      ],
      atividade_principal: {
        secao: '',
        divisao: '',
        grupo: '',
        classe: '',
        subclasse: '',
        digito: '',
        referencia: '',
        modalidade: 'basico',
        nomeclatura_atividade: ''
      },
      empreendimento: {
        capital: '',
        area_total: '',
        construida: '',
        utilizada: '',
        direto: '',
        terceirizados: ''
      },
      ativo: true
    });
    setEditingContribuinte(null);
    setShowModal(false);
    setActiveTab('dados-cadastrais');
  };

  const handleEdit = (contribuinte) => {
    setFormData(contribuinte);
    setEditingContribuinte(contribuinte);
    setShowModal(true);
    setActiveTab('dados-cadastrais');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contribuinte?')) {
      setContribuintes(contribuintes.filter(contribuinte => contribuinte.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setContribuintes(contribuintes.map(contribuinte => 
      contribuinte.id === id 
        ? { ...contribuinte, ativo: !contribuinte.ativo }
        : contribuinte
    ));
  };

  const addSocio = () => {
    setFormData({
      ...formData,
      socios: [
        ...formData.socios,
        {
          nome: '',
          cpf: '',
          rg: '',
          orgao_expedidor: '',
          fone: '',
          sexo: 'masculino'
        }
      ]
    });
  };

  const removeSocio = (index) => {
    const newSocios = formData.socios.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      socios: newSocios.length > 0 ? newSocios : [
        {
          nome: '',
          cpf: '',
          rg: '',
          orgao_expedidor: '',
          fone: '',
          sexo: 'masculino'
        }
      ]
    });
  };

  const updateSocio = (index, field, value) => {
    const newSocios = [...formData.socios];
    newSocios[index] = { ...newSocios[index], [field]: value };
    setFormData({ ...formData, socios: newSocios });
  };

  return (
    <div className="contribuintes-container">
      <div className="page-header">
        <h1>Contribuintes</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Novo Contribuinte
        </button>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por razão social, nome fantasia, CNPJ ou inscrição municipal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th>Nome Fantasia</th>
                <th>Situação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredContribuintes.map(contribuinte => (
                <tr key={contribuinte.id}>
                  <td>{contribuinte.id}</td>
                  <td>{contribuinte.tipo_contribuinte}</td>
                  <td>{contribuinte.cnpj}</td>
                  <td>{contribuinte.razao_social}</td>
                  <td>{contribuinte.nome_fantasia}</td>
                  <td>
                    <span className={`status-badge ${contribuinte.situacao_cadastral}`}>
                      {contribuinte.situacao_cadastral}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`status-toggle ${contribuinte.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(contribuinte.id)}
                    >
                      {contribuinte.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(contribuinte)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(contribuinte.id)}
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
              <h2>{editingContribuinte ? 'Editar Contribuinte' : 'Novo Contribuinte'}</h2>
              <button className="close-button" onClick={resetForm}>×</button>
            </div>

            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'dados-cadastrais' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dados-cadastrais')}
                >
                  Dados Cadastrais
                </button>
                <button 
                  className={`tab-button ${activeTab === 'dados-socios' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dados-socios')}
                >
                  Dados do(s) Sócio(s)
                </button>
                <button 
                  className={`tab-button ${activeTab === 'atividade-principal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atividade-principal')}
                >
                  Atividade Principal
                </button>
                <button 
                  className={`tab-button ${activeTab === 'dados-empreendimento' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dados-empreendimento')}
                >
                  Dados do Empreendimento
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Aba Dados Cadastrais */}
                {activeTab === 'dados-cadastrais' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Dados Básicos</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Tipo Contribuinte *</label>
                          <input
                            type="number"
                            value={formData.tipo_contribuinte}
                            onChange={(e) => setFormData({...formData, tipo_contribuinte: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CNPJ *</label>
                          <input
                            type="text"
                            value={formData.cnpj}
                            onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                            required
                            placeholder="00.000.000/0000-00"
                          />
                        </div>
                        <div className="form-group">
                          <label>Inscrição Municipal *</label>
                          <input
                            type="text"
                            value={formData.inscricao_municipal}
                            onChange={(e) => setFormData({...formData, inscricao_municipal: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Inscrição Estadual</label>
                          <input
                            type="text"
                            value={formData.inscricao_estadual}
                            onChange={(e) => setFormData({...formData, inscricao_estadual: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>DNPM</label>
                          <input
                            type="text"
                            value={formData.dnpm}
                            onChange={(e) => setFormData({...formData, dnpm: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Situação Cadastral *</label>
                          <select
                            value={formData.situacao_cadastral}
                            onChange={(e) => setFormData({...formData, situacao_cadastral: e.target.value})}
                            required
                          >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="suspenso">Suspenso</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Roteiro</label>
                          <input
                            type="text"
                            value={formData.roteiro}
                            onChange={(e) => setFormData({...formData, roteiro: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Razão Social *</label>
                          <input
                            type="text"
                            value={formData.razao_social}
                            onChange={(e) => setFormData({...formData, razao_social: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Nome Fantasia</label>
                          <input
                            type="text"
                            value={formData.nome_fantasia}
                            onChange={(e) => setFormData({...formData, nome_fantasia: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Localização</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Endereço</label>
                          <input
                            type="text"
                            value={formData.endereco}
                            onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Núcleo</label>
                          <input
                            type="text"
                            value={formData.nucleo}
                            onChange={(e) => setFormData({...formData, nucleo: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Tipo Logradouro</label>
                          <input
                            type="text"
                            value={formData.tipo_logradouro}
                            onChange={(e) => setFormData({...formData, tipo_logradouro: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Número</label>
                          <input
                            type="text"
                            value={formData.numero}
                            onChange={(e) => setFormData({...formData, numero: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Quadra</label>
                          <input
                            type="text"
                            value={formData.quadra}
                            onChange={(e) => setFormData({...formData, quadra: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cidade</label>
                          <input
                            type="text"
                            value={formData.cidade}
                            onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Logradouro</label>
                          <input
                            type="text"
                            value={formData.logradouro}
                            onChange={(e) => setFormData({...formData, logradouro: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Bairro</label>
                          <input
                            type="text"
                            value={formData.bairro}
                            onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Complemento</label>
                          <input
                            type="text"
                            value={formData.complemento}
                            onChange={(e) => setFormData({...formData, complemento: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Email Principal</label>
                          <input
                            type="email"
                            value={formData.email_principal}
                            onChange={(e) => setFormData({...formData, email_principal: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email Alternativo</label>
                          <input
                            type="email"
                            value={formData.email_alternativo}
                            onChange={(e) => setFormData({...formData, email_alternativo: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Telefone</label>
                          <input
                            type="text"
                            value={formData.telefone}
                            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                            placeholder="(00) 0000-0000"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>CEP</label>
                          <input
                            type="text"
                            value={formData.cep}
                            onChange={(e) => setFormData({...formData, cep: e.target.value})}
                            placeholder="00000-000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Dados dos Sócios */}
                {activeTab === 'dados-socios' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <div className="section-header">
                        <h3>Dados do(s) Sócio(s)</h3>
                        <button type="button" className="btn-add" onClick={addSocio}>
                          Adicionar Sócio
                        </button>
                      </div>
                      
                      {formData.socios.map((socio, index) => (
                        <div key={index} className="socio-card">
                          <div className="socio-header">
                            <h4>Sócio {index + 1}</h4>
                            {formData.socios.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeSocio(index)}
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Nome *</label>
                              <input
                                type="text"
                                value={socio.nome}
                                onChange={(e) => updateSocio(index, 'nome', e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>CPF *</label>
                              <input
                                type="text"
                                value={socio.cpf}
                                onChange={(e) => updateSocio(index, 'cpf', e.target.value)}
                                required
                                placeholder="000.000.000-00"
                              />
                            </div>
                            <div className="form-group">
                              <label>RG</label>
                              <input
                                type="text"
                                value={socio.rg}
                                onChange={(e) => updateSocio(index, 'rg', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Órgão Expedidor</label>
                              <input
                                type="text"
                                value={socio.orgao_expedidor}
                                onChange={(e) => updateSocio(index, 'orgao_expedidor', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Telefone</label>
                              <input
                                type="text"
                                value={socio.fone}
                                onChange={(e) => updateSocio(index, 'fone', e.target.value)}
                                placeholder="(00) 00000-0000"
                              />
                            </div>
                            <div className="form-group">
                              <label>Sexo</label>
                              <select
                                value={socio.sexo}
                                onChange={(e) => updateSocio(index, 'sexo', e.target.value)}
                              >
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
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
                          <label>Seção</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.secao}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                secao: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Divisão</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.divisao}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                divisao: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Grupo</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.grupo}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                grupo: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Classe</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.classe}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                classe: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Subclasse</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.subclasse}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                subclasse: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Dígito</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.digito}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                digito: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Referência</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.referencia}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                referencia: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Modalidade</label>
                          <select
                            value={formData.atividade_principal.modalidade}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                modalidade: e.target.value
                              }
                            })}
                          >
                            <option value="basico">Básico</option>
                            <option value="padrao">Padrão</option>
                            <option value="simplificado">Simplificado</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group full-width">
                          <label>Nomenclatura da Atividade</label>
                          <input
                            type="text"
                            value={formData.atividade_principal.nomeclatura_atividade}
                            onChange={(e) => setFormData({
                              ...formData, 
                              atividade_principal: {
                                ...formData.atividade_principal,
                                nomeclatura_atividade: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Dados do Empreendimento */}
                {activeTab === 'dados-empreendimento' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Investimento/Área</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Capital</label>
                          <input
                            type="text"
                            value={formData.empreendimento.capital}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                capital: e.target.value
                              }
                            })}
                            placeholder="0,00"
                          />
                        </div>
                        <div className="form-group">
                          <label>Área Total</label>
                          <input
                            type="text"
                            value={formData.empreendimento.area_total}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                area_total: e.target.value
                              }
                            })}
                            placeholder="0,00 m²"
                          />
                        </div>
                        <div className="form-group">
                          <label>Área Construída</label>
                          <input
                            type="text"
                            value={formData.empreendimento.construida}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                construida: e.target.value
                              }
                            })}
                            placeholder="0,00 m²"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Área Utilizada</label>
                          <input
                            type="text"
                            value={formData.empreendimento.utilizada}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                utilizada: e.target.value
                              }
                            })}
                            placeholder="0,00 m²"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Quadro Funcional</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Funcionários Diretos</label>
                          <input
                            type="text"
                            value={formData.empreendimento.direto}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                direto: e.target.value
                              }
                            })}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group">
                          <label>Funcionários Terceirizados</label>
                          <input
                            type="text"
                            value={formData.empreendimento.terceirizados}
                            onChange={(e) => setFormData({
                              ...formData, 
                              empreendimento: {
                                ...formData.empreendimento,
                                terceirizados: e.target.value
                              }
                            })}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingContribuinte ? 'Atualizar' : 'Salvar'}
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

export default Contribuintes;