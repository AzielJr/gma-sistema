import React, { useState, useEffect } from 'react';
import './TecnicosAmbientais.css';

const TecnicosAmbientais = () => {
  // Dados mockados para demonstração
  const mockTecnicos = [
    {
      id: 1,
      operacao: 'Cadastro',
      cpf: '123.456.789-00',
      data_cadastro: '2024-01-15',
      data_nascimento: '1985-03-20',
      valido_ate: '2025-01-15',
      foto: null,
      codigo: 'TEC001',
      nome: 'João Silva Santos',
      apelido: 'João',
      estado_civil: 'Casado',
      nacionalidade: 'Brasileira',
      naturalidade: 'São Paulo',
      sexo: 'Masculino',
      rg: '12.345.678-9',
      orgao_emissor: 'SSP',
      data_emissao: '2010-05-15',
      uf: 'SP',
      endereco: {
        nucleo: 'Centro',
        tipo_logradouro: 'Rua',
        numero: '123',
        quadra: 'A',
        cidade: 'São Paulo',
        logradouro: 'Rua das Flores',
        bairro: 'Centro',
        complemento: 'Apto 101',
        uf: 'SP',
        cep: '01234-567',
        telefone: '(11) 99999-9999',
        email_principal: 'joao@email.com',
        email_alternativo: 'joao.alt@email.com'
      },
      filiacao: {
        mae: {
          nome: 'Maria Silva',
          telefone: '(11) 88888-8888',
          email: 'maria@email.com'
        },
        pai: {
          nome: 'José Silva',
          telefone: '(11) 77777-7777',
          email: 'jose@email.com'
        }
      },
      atividade_profissional: {
        profissao: 'Engenheiro Ambiental',
        registro: 'CREA-SP 123456',
        validade: '2025-12-31',
        instituicao_formacao: 'USP',
        data_formatura: '2008-12-15',
        cidade_formacao: 'São Paulo',
        uf: 'SP'
      },
      ativo: true
    }
  ];

  const [tecnicos, setTecnicos] = useState(mockTecnicos);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTecnico, setEditingTecnico] = useState(null);
  const [activeTab, setActiveTab] = useState('dados-pessoais');
  const [formData, setFormData] = useState({
    operacao: '',
    cpf: '',
    data_cadastro: new Date().toISOString().split('T')[0],
    data_nascimento: '',
    valido_ate: '',
    foto: null,
    codigo: '',
    nome: '',
    apelido: '',
    estado_civil: '',
    nacionalidade: '',
    naturalidade: '',
    sexo: '',
    rg: '',
    orgao_emissor: '',
    data_emissao: '',
    uf: '',
    endereco: {
      nucleo: '',
      tipo_logradouro: '',
      numero: '',
      quadra: '',
      cidade: '',
      logradouro: '',
      bairro: '',
      complemento: '',
      uf: '',
      cep: '',
      telefone: '',
      email_principal: '',
      email_alternativo: ''
    },
    filiacao: {
      mae: {
        nome: '',
        telefone: '',
        email: ''
      },
      pai: {
        nome: '',
        telefone: '',
        email: ''
      }
    },
    atividade_profissional: {
      profissao: '',
      registro: '',
      validade: '',
      instituicao_formacao: '',
      data_formatura: '',
      cidade_formacao: '',
      uf: ''
    },
    ativo: true
  });

  useEffect(() => {
    setTecnicos(mockTecnicos);
  }, []);

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.cpf.includes(searchTerm) ||
    tecnico.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.atividade_profissional.profissao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTecnico) {
      setTecnicos(tecnicos.map(tecnico => 
        tecnico.id === editingTecnico.id 
          ? { ...formData, id: editingTecnico.id }
          : tecnico
      ));
    } else {
      const newTecnico = {
        ...formData,
        id: Math.max(...tecnicos.map(t => t.id)) + 1
      };
      setTecnicos([...tecnicos, newTecnico]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      operacao: '',
      cpf: '',
      data_cadastro: new Date().toISOString().split('T')[0],
      data_nascimento: '',
      valido_ate: '',
      foto: null,
      codigo: '',
      nome: '',
      apelido: '',
      estado_civil: '',
      nacionalidade: '',
      naturalidade: '',
      sexo: '',
      rg: '',
      orgao_emissor: '',
      data_emissao: '',
      uf: '',
      endereco: {
        nucleo: '',
        tipo_logradouro: '',
        numero: '',
        quadra: '',
        cidade: '',
        logradouro: '',
        bairro: '',
        complemento: '',
        uf: '',
        cep: '',
        telefone: '',
        email_principal: '',
        email_alternativo: ''
      },
      filiacao: {
        mae: {
          nome: '',
          telefone: '',
          email: ''
        },
        pai: {
          nome: '',
          telefone: '',
          email: ''
        }
      },
      atividade_profissional: {
        profissao: '',
        registro: '',
        validade: '',
        instituicao_formacao: '',
        data_formatura: '',
        cidade_formacao: '',
        uf: ''
      },
      ativo: true
    });
    setEditingTecnico(null);
    setShowModal(false);
    setActiveTab('dados-pessoais');
  };

  const handleEdit = (tecnico) => {
    setFormData(tecnico);
    setEditingTecnico(tecnico);
    setShowModal(true);
    setActiveTab('dados-pessoais');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este técnico ambiental?')) {
      setTecnicos(tecnicos.filter(tecnico => tecnico.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTecnicos(tecnicos.map(tecnico => 
      tecnico.id === id 
        ? { ...tecnico, ativo: !tecnico.ativo }
        : tecnico
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

  return (
    <div className="tecnicos-ambientais-container">
      <div className="page-header">
        <h1>Técnicos Ambientais</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Novo Técnico
        </button>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nome, CPF, código ou profissão..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Profissão</th>
                <th>Data Cadastro</th>
                <th>Válido Até</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTecnicos.map(tecnico => (
                <tr key={tecnico.id}>
                  <td>{tecnico.id}</td>
                  <td>{tecnico.codigo}</td>
                  <td>{tecnico.nome}</td>
                  <td>{tecnico.cpf}</td>
                  <td>{tecnico.atividade_profissional.profissao}</td>
                  <td>{new Date(tecnico.data_cadastro).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(tecnico.valido_ate).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button
                      className={`status-toggle ${tecnico.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(tecnico.id)}
                    >
                      {tecnico.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(tecnico)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(tecnico.id)}
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
              <h2>{editingTecnico ? 'Editar Técnico Ambiental' : 'Novo Técnico Ambiental'}</h2>
              <button className="close-button" onClick={resetForm}>×</button>
            </div>

            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'dados-pessoais' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dados-pessoais')}
                >
                  Dados Pessoais
                </button>
                <button 
                  className={`tab-button ${activeTab === 'endereco' ? 'active' : ''}`}
                  onClick={() => setActiveTab('endereco')}
                >
                  Endereço
                </button>
                <button 
                  className={`tab-button ${activeTab === 'filiacao' ? 'active' : ''}`}
                  onClick={() => setActiveTab('filiacao')}
                >
                  Filiação
                </button>
                <button 
                  className={`tab-button ${activeTab === 'atividade-profissional' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atividade-profissional')}
                >
                  Atividade Profissional/Formação
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Aba Dados Pessoais */}
                {activeTab === 'dados-pessoais' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Informações Básicas</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Operação *</label>
                          <input
                            type="text"
                            value={formData.operacao}
                            onChange={(e) => setFormData({...formData, operacao: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CPF *</label>
                          <input
                            type="text"
                            value={formData.cpf}
                            onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Data Cadastro *</label>
                          <input
                            type="date"
                            value={formData.data_cadastro}
                            onChange={(e) => setFormData({...formData, data_cadastro: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Data Nascimento *</label>
                          <input
                            type="date"
                            value={formData.data_nascimento}
                            onChange={(e) => setFormData({...formData, data_nascimento: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Válido Até *</label>
                          <input
                            type="date"
                            value={formData.valido_ate}
                            onChange={(e) => setFormData({...formData, valido_ate: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Código *</label>
                          <input
                            type="text"
                            value={formData.codigo}
                            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Dados Pessoais</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nome Completo *</label>
                          <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Apelido</label>
                          <input
                            type="text"
                            value={formData.apelido}
                            onChange={(e) => setFormData({...formData, apelido: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Estado Civil</label>
                          <select
                            value={formData.estado_civil}
                            onChange={(e) => setFormData({...formData, estado_civil: e.target.value})}
                          >
                            <option value="">Selecione...</option>
                            <option value="Solteiro">Solteiro(a)</option>
                            <option value="Casado">Casado(a)</option>
                            <option value="Divorciado">Divorciado(a)</option>
                            <option value="Viúvo">Viúvo(a)</option>
                            <option value="União Estável">União Estável</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Nacionalidade</label>
                          <select
                            value={formData.nacionalidade}
                            onChange={(e) => setFormData({...formData, nacionalidade: e.target.value})}
                          >
                            <option value="">Selecione...</option>
                            <option value="Brasileira">Brasileira</option>
                            <option value="Estrangeira">Estrangeira</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Naturalidade</label>
                          <select
                            value={formData.naturalidade}
                            onChange={(e) => setFormData({...formData, naturalidade: e.target.value})}
                          >
                            <option value="">Selecione...</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Belo Horizonte">Belo Horizonte</option>
                            <option value="Brasília">Brasília</option>
                            <option value="Salvador">Salvador</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Sexo</label>
                          <select
                            value={formData.sexo}
                            onChange={(e) => setFormData({...formData, sexo: e.target.value})}
                          >
                            <option value="">Selecione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Documentação</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>RG *</label>
                          <input
                            type="text"
                            value={formData.rg}
                            onChange={(e) => setFormData({...formData, rg: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Órgão Emissor *</label>
                          <input
                            type="text"
                            value={formData.orgao_emissor}
                            onChange={(e) => setFormData({...formData, orgao_emissor: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Data Emissão *</label>
                          <input
                            type="date"
                            value={formData.data_emissao}
                            onChange={(e) => setFormData({...formData, data_emissao: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>UF *</label>
                          <select
                            value={formData.uf}
                            onChange={(e) => setFormData({...formData, uf: e.target.value})}
                            required
                          >
                            <option value="">Selecione...</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="PR">Paraná</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Endereço */}
                {activeTab === 'endereco' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Endereço</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Núcleo</label>
                          <select
                            value={formData.endereco.nucleo}
                            onChange={(e) => updateNestedField('endereco.nucleo', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="Centro">Centro</option>
                            <option value="Norte">Norte</option>
                            <option value="Sul">Sul</option>
                            <option value="Leste">Leste</option>
                            <option value="Oeste">Oeste</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Tipo Logradouro</label>
                          <select
                            value={formData.endereco.tipo_logradouro}
                            onChange={(e) => updateNestedField('endereco.tipo_logradouro', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="Rua">Rua</option>
                            <option value="Avenida">Avenida</option>
                            <option value="Travessa">Travessa</option>
                            <option value="Alameda">Alameda</option>
                            <option value="Praça">Praça</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Número</label>
                          <input
                            type="text"
                            value={formData.endereco.numero}
                            onChange={(e) => updateNestedField('endereco.numero', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Quadra</label>
                          <input
                            type="text"
                            value={formData.endereco.quadra}
                            onChange={(e) => updateNestedField('endereco.quadra', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cidade</label>
                          <select
                            value={formData.endereco.cidade}
                            onChange={(e) => updateNestedField('endereco.cidade', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Belo Horizonte">Belo Horizonte</option>
                            <option value="Brasília">Brasília</option>
                            <option value="Salvador">Salvador</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Logradouro</label>
                          <input
                            type="text"
                            value={formData.endereco.logradouro}
                            onChange={(e) => updateNestedField('endereco.logradouro', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Bairro</label>
                          <select
                            value={formData.endereco.bairro}
                            onChange={(e) => updateNestedField('endereco.bairro', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="Centro">Centro</option>
                            <option value="Vila Madalena">Vila Madalena</option>
                            <option value="Copacabana">Copacabana</option>
                            <option value="Savassi">Savassi</option>
                            <option value="Asa Norte">Asa Norte</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Complemento</label>
                          <input
                            type="text"
                            value={formData.endereco.complemento}
                            onChange={(e) => updateNestedField('endereco.complemento', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>UF</label>
                          <select
                            value={formData.endereco.uf}
                            onChange={(e) => updateNestedField('endereco.uf', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="BA">Bahia</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>CEP</label>
                          <input
                            type="text"
                            value={formData.endereco.cep}
                            onChange={(e) => updateNestedField('endereco.cep', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Telefone</label>
                          <input
                            type="text"
                            value={formData.endereco.telefone}
                            onChange={(e) => updateNestedField('endereco.telefone', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Email Principal</label>
                          <input
                            type="email"
                            value={formData.endereco.email_principal}
                            onChange={(e) => updateNestedField('endereco.email_principal', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email Alternativo</label>
                          <input
                            type="email"
                            value={formData.endereco.email_alternativo}
                            onChange={(e) => updateNestedField('endereco.email_alternativo', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Filiação */}
                {activeTab === 'filiacao' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Dados da Mãe</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nome</label>
                          <input
                            type="text"
                            value={formData.filiacao.mae.nome}
                            onChange={(e) => updateNestedField('filiacao.mae.nome', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Telefone</label>
                          <input
                            type="text"
                            value={formData.filiacao.mae.telefone}
                            onChange={(e) => updateNestedField('filiacao.mae.telefone', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={formData.filiacao.mae.email}
                            onChange={(e) => updateNestedField('filiacao.mae.email', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Dados do Pai</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nome</label>
                          <input
                            type="text"
                            value={formData.filiacao.pai.nome}
                            onChange={(e) => updateNestedField('filiacao.pai.nome', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Telefone</label>
                          <input
                            type="text"
                            value={formData.filiacao.pai.telefone}
                            onChange={(e) => updateNestedField('filiacao.pai.telefone', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={formData.filiacao.pai.email}
                            onChange={(e) => updateNestedField('filiacao.pai.email', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aba Atividade Profissional/Formação */}
                {activeTab === 'atividade-profissional' && (
                  <div className="tab-content">
                    <div className="form-section">
                      <h3>Profissão/Instituição</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Profissão</label>
                          <select
                            value={formData.atividade_profissional.profissao}
                            onChange={(e) => updateNestedField('atividade_profissional.profissao', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="Engenheiro Ambiental">Engenheiro Ambiental</option>
                            <option value="Biólogo">Biólogo</option>
                            <option value="Geólogo">Geólogo</option>
                            <option value="Químico">Químico</option>
                            <option value="Técnico em Meio Ambiente">Técnico em Meio Ambiente</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Registro</label>
                          <input
                            type="text"
                            value={formData.atividade_profissional.registro}
                            onChange={(e) => updateNestedField('atividade_profissional.registro', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Validade</label>
                          <input
                            type="date"
                            value={formData.atividade_profissional.validade}
                            onChange={(e) => updateNestedField('atividade_profissional.validade', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Instituição de Formação</label>
                          <select
                            value={formData.atividade_profissional.instituicao_formacao}
                            onChange={(e) => updateNestedField('atividade_profissional.instituicao_formacao', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="USP">Universidade de São Paulo</option>
                            <option value="UFRJ">Universidade Federal do Rio de Janeiro</option>
                            <option value="UFMG">Universidade Federal de Minas Gerais</option>
                            <option value="UnB">Universidade de Brasília</option>
                            <option value="UFBA">Universidade Federal da Bahia</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Data Formatura</label>
                          <input
                            type="date"
                            value={formData.atividade_profissional.data_formatura}
                            onChange={(e) => updateNestedField('atividade_profissional.data_formatura', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cidade Formação</label>
                          <select
                            value={formData.atividade_profissional.cidade_formacao}
                            onChange={(e) => updateNestedField('atividade_profissional.cidade_formacao', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Belo Horizonte">Belo Horizonte</option>
                            <option value="Brasília">Brasília</option>
                            <option value="Salvador">Salvador</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>UF</label>
                          <select
                            value={formData.atividade_profissional.uf}
                            onChange={(e) => updateNestedField('atividade_profissional.uf', e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="BA">Bahia</option>
                          </select>
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
                    {editingTecnico ? 'Atualizar' : 'Salvar'}
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

export default TecnicosAmbientais;