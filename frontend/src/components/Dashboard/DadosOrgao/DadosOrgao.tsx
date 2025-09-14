import React, { useState } from 'react';
import './DadosOrgao.css';

const DadosOrgao = () => {
  const [activeTab, setActiveTab] = useState('dados-cadastrais');
  const [loading, setLoading] = useState(false);
  const [auditFilters, setAuditFilters] = useState({
    dataInicio: '',
    dataFim: '',
    usuario: ''
  });
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    secretaria: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
    site: '',
    nomeResponsavel: '',
    celularResponsavel: '',
    emailResponsavel: '',
    observacao: ''
  });

  // Dados fictícios para auditoria
  const auditData = [
    {
      id: 1,
      data: '15/01/2025',
      hora: '09:15:32',
      usuario: 'admin@sistema.com',
      operacao: 'LOGIN',
      historico: 'Usuário realizou login no sistema'
    },
    {
      id: 2,
      data: '15/01/2025',
      hora: '09:18:45',
      usuario: 'admin@sistema.com',
      operacao: 'CREATE',
      historico: 'Criado novo processo de licenciamento #2025001'
    },
    {
      id: 3,
      data: '15/01/2025',
      hora: '10:22:18',
      usuario: 'joao.silva@orgao.gov.br',
      operacao: 'UPDATE',
      historico: 'Atualizado dados cadastrais da empresa SISTEMAP LTDA'
    },
    {
      id: 4,
      data: '15/01/2025',
      hora: '11:05:33',
      usuario: 'maria.santos@orgao.gov.br',
      operacao: 'VIEW',
      historico: 'Consultou relatório de processos em andamento'
    },
    {
      id: 5,
      data: '15/01/2025',
      hora: '14:30:12',
      usuario: 'carlos.oliveira@orgao.gov.br',
      operacao: 'DELETE',
      historico: 'Removido documento anexo do processo #2024987'
    },
    {
      id: 6,
      data: '15/01/2025',
      hora: '15:45:28',
      usuario: 'ana.costa@orgao.gov.br',
      operacao: 'UPDATE',
      historico: 'Alterado status do processo #2025001 para "Em Análise"'
    },
    {
      id: 7,
      data: '14/01/2025',
      hora: '16:20:55',
      usuario: 'pedro.almeida@orgao.gov.br',
      operacao: 'CREATE',
      historico: 'Criado novo usuário: tecnico.ambiental@orgao.gov.br'
    },
    {
      id: 8,
      data: '14/01/2025',
      hora: '17:10:42',
      usuario: 'admin@sistema.com',
      operacao: 'LOGOUT',
      historico: 'Usuário encerrou sessão no sistema'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuditFilterChange = (e) => {
    const { name, value } = e.target;
    setAuditFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuditFilter = () => {
    // Implementar lógica de filtro
    console.log('Filtros aplicados:', auditFilters);
    alert('Filtros aplicados com sucesso!');
  };

  const getOperationClass = (operation) => {
    const classes = {
      'CREATE': 'operation-create',
      'UPDATE': 'operation-update',
      'DELETE': 'operation-delete',
      'LOGIN': 'operation-login',
      'LOGOUT': 'operation-logout',
      'VIEW': 'operation-view'
    };
    return classes[operation] || 'operation-view';
  };

  const getOperationText = (operation) => {
    const texts = {
      'CREATE': 'Criação',
      'UPDATE': 'Atualização',
      'DELETE': 'Exclusão',
      'LOGIN': 'Login',
      'LOGOUT': 'Logout',
      'VIEW': 'Visualização'
    };
    return texts[operation] || operation;
  };

  const formatCNPJ = (cnpj) => {
    const numbers = cnpj.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const removeCNPJMask = (cnpj) => {
    return cnpj.replace(/\D/g, '');
  };

  const handleCNPJChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCNPJ(value);
    if (formattedValue.length <= 18) {
      setFormData(prev => ({
        ...prev,
        cnpj: formattedValue
      }));
    }
  };

  const buscarDadosCNPJ = async () => {
    if (!formData.cnpj) {
      alert('Por favor, informe o CNPJ');
      return;
    }

    const cnpjLimpo = removeCNPJMask(formData.cnpj);
    
    if (cnpjLimpo.length !== 14) {
      alert('CNPJ deve conter 14 dígitos');
      return;
    }

    setLoading(true);
    
    try {
      // Usando um proxy CORS ou API alternativa
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`;
      
      // Alternativa: usar fetch com mode no-cors (limitado) ou implementar proxy no backend
      let response;
      
      try {
        // Primeira tentativa: direto
        response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
      } catch (corsError) {
        // Segunda tentativa: com proxy público (pode estar indisponível)
        try {
          response = await fetch(proxyUrl + targetUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          });
        } catch (proxyError) {
          // Terceira tentativa: simulação com dados de exemplo
          console.warn('API indisponível, usando dados simulados');
          const dadosSimulados = {
            status: 'OK',
            nome: 'EMPRESA EXEMPLO LTDA',
            fantasia: 'EXEMPLO',
            logradouro: 'RUA EXEMPLO',
            numero: '123',
            complemento: 'SALA 01',
            municipio: 'CIDADE EXEMPLO',
            bairro: 'BAIRRO EXEMPLO',
            uf: 'SP',
            cep: '01234-567',
            email: 'contato@exemplo.com.br',
            natureza_juridica: '206-2 - Sociedade Empresária Limitada',
            abertura: '01/01/2020',
            qsa: [{ nome: 'RESPONSÁVEL EXEMPLO' }]
          };
          
          setFormData(prev => ({
            ...prev,
            razaoSocial: dadosSimulados.nome,
            endereco: `${dadosSimulados.logradouro}, ${dadosSimulados.numero}`,
            complemento: dadosSimulados.complemento,
            cidade: dadosSimulados.municipio,
            cep: dadosSimulados.cep,
            bairro: dadosSimulados.bairro,
            uf: dadosSimulados.uf,
            email: dadosSimulados.email,
            nomeResponsavel: dadosSimulados.qsa[0].nome,
            emailResponsavel: dadosSimulados.email,
            observacao: `Natureza Jurídica: ${dadosSimulados.natureza_juridica}\nData de Abertura: ${dadosSimulados.abertura}\n\nNota: Dados simulados - API indisponível devido a restrições CORS`
          }));
          
          alert('Dados simulados carregados! Para usar dados reais, configure um proxy no backend.');
          setLoading(false);
          return;
        }
      }
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'OK') {
          setFormData(prev => ({
            ...prev,
            razaoSocial: data.nome || '',
            endereco: `${data.logradouro || ''} ${data.numero || ''}`.trim(),
            complemento: data.complemento || '',
            cidade: data.municipio || '',
            cep: data.cep || '',
            bairro: data.bairro || '',
            uf: data.uf || '',
            email: data.email || '',
            nomeResponsavel: (data.qsa && data.qsa.length > 0) ? data.qsa[0].nome : '',
            emailResponsavel: data.email || '',
            observacao: `Natureza Jurídica: ${data.natureza_juridica || 'Não informada'}\nData de Abertura: ${data.abertura || 'Não informada'}`
          }));
          
          alert('Dados carregados com sucesso!');
        } else {
          alert('CNPJ não encontrado ou inválido');
        }
      } else {
        throw new Error('Erro na resposta da API');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do CNPJ:', error);
      alert('Erro ao consultar CNPJ. Para resolver: configure um proxy no backend ou use uma extensão CORS no navegador.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Dados salvos com sucesso!');
  };

  // Função para buscar dados do CEP
  const buscarDadosCEP = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      alert('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      // Preencher automaticamente os campos
      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || ''
      }));

      // Focar no campo número após um pequeno delay
      setTimeout(() => {
        const numeroField = document.querySelector('input[name="numero"]');
        if (numeroField) {
          numeroField.focus();
        }
      }, 100);

    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao consultar CEP. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar CEP
  const handleCEPChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      setFormData(prev => ({ ...prev, cep: value }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dados-cadastrais':
        return (
          <div className="tab-content">
            <form onSubmit={handleSubmit}>
              {/* Upload de Imagens */}
              <div className="form-group">
                <h3>Upload de Imagens</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label>Logomarca do Órgão:</label>
                    <input type="file" accept="image/*" className="form-control" />
                  </div>
                  <div className="form-field">
                    <label>Logomarca da Secretaria:</label>
                    <input type="file" accept="image/*" className="form-control" />
                  </div>
                </div>
              </div>

              {/* Dados Básicos */}
              <div className="form-group">
                <h3>Dados Básicos</h3>
                <div className="form-row">
                  <div className="form-field cnpj-field">
                    <label htmlFor="cnpj">CNPJ: *</label>
                    <div className="input-with-search">
                      <input 
                        type="text" 
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleCNPJChange}
                        className="form-control" 
                        placeholder="00.000.000/0000-00" 
                        maxLength="18"
                        required 
                      />
                      <button 
                        type="button" 
                        className="search-icon-btn" 
                        onClick={buscarDadosCNPJ}
                        disabled={loading}
                        title="Carregar informações"
                      >
                        {loading ? '⏳' : '🔍'}
                      </button>
                    </div>
                  </div>
                  <div className="form-field razao-social-field">
                    <label htmlFor="razaoSocial">Razão Social: *</label>
                    <input 
                      type="text" 
                      id="razaoSocial"
                      name="razaoSocial"
                      value={formData.razaoSocial}
                      onChange={handleInputChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field full-width">
                    <label htmlFor="secretaria">Secretaria:</label>
                    <input 
                      type="text" 
                      id="secretaria"
                      name="secretaria"
                      value={formData.secretaria}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="form-group">
                <h3>Endereço</h3>
                <div className="form-row">
                  <div className="form-field cep-field">
                    <label htmlFor="cep">CEP:</label>
                    <div className="input-with-search">
                      <input 
                        type="text" 
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleCEPChange}
                        className="form-control" 
                        placeholder="00000-000"
                      />
                      <button 
                        type="button" 
                        className="search-icon-btn" 
                        onClick={buscarDadosCEP}
                        disabled={loading}
                        title="Capturar Endereço"
                      >
                        {loading ? '⏳' : '🔍'}
                      </button>
                    </div>
                  </div>
                  <div className="form-field endereco-field">
                    <label htmlFor="endereco">Endereço:</label>
                    <input 
                      type="text" 
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-field numero-field">
                    <label htmlFor="numero">Número:</label>
                    <input 
                      type="text" 
                      id="numero"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="complemento">Complemento:</label>
                    <input 
                      type="text" 
                      id="complemento"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="bairro">Bairro:</label>
                    <input 
                      type="text" 
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cidade">Cidade:</label>
                    <input 
                      type="text" 
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-field uf-field">
                    <label htmlFor="uf">UF:</label>
                    <select 
                      id="uf"
                      name="uf"
                      value={formData.uf}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Selecione</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contatos */}
              <div className="form-group">
                <h3>Contatos</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="telefone">Telefone:</label>
                    <input 
                      type="text" 
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="(00) 0000-0000" 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email:</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="site">Site:</label>
                    <input 
                      type="url" 
                      id="site"
                      name="site"
                      value={formData.site}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="https://" 
                    />
                  </div>
                </div>
              </div>

              {/* Responsável */}
              <div className="form-group">
                <h3>Responsável</h3>
                <div className="form-row">
                  <div className="form-field full-width">
                    <label htmlFor="nomeResponsavel">Nome do Responsável:</label>
                    <input 
                      type="text" 
                      id="nomeResponsavel"
                      name="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="celularResponsavel">Celular:</label>
                    <input 
                      type="text" 
                      id="celularResponsavel"
                      name="celularResponsavel"
                      value={formData.celularResponsavel}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="(00) 00000-0000" 
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="emailResponsavel">Email:</label>
                    <input 
                      type="email" 
                      id="emailResponsavel"
                      name="emailResponsavel"
                      value={formData.emailResponsavel}
                      onChange={handleInputChange}
                      className="form-control" 
                    />
                  </div>
                </div>
              </div>

              {/* Observação */}
              <div className="form-group">
                <h3>Observação</h3>
                <div className="form-row">
                  <div className="form-field full-width">
                    <textarea 
                      id="observacao"
                      name="observacao"
                      value={formData.observacao}
                      onChange={handleInputChange}
                      className="form-control" 
                      rows="4" 
                      placeholder="Informações adicionais..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Atualizar</button>
              </div>
            </form>
          </div>
        );
      case 'log-auditoria':
        return (
          <div className="tab-content">
            <div className="audit-filters">
              <h4>Filtros de Auditoria</h4>
              <div className="filter-row">
                <div className="filter-field">
                  <label htmlFor="dataInicio">Data Início:</label>
                  <input
                    type="date"
                    id="dataInicio"
                    name="dataInicio"
                    value={auditFilters.dataInicio}
                    onChange={handleAuditFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="filter-field">
                  <label htmlFor="dataFim">Data Fim:</label>
                  <input
                    type="date"
                    id="dataFim"
                    name="dataFim"
                    value={auditFilters.dataFim}
                    onChange={handleAuditFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="filter-field">
                  <label htmlFor="usuario">Usuário:</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={auditFilters.usuario}
                    onChange={handleAuditFilterChange}
                    className="form-control"
                    placeholder="Digite o nome ou email do usuário"
                  />
                </div>
                <div className="filter-field">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    onClick={handleAuditFilter}
                    className="btn btn-secondary"
                  >
                    Filtrar
                  </button>
                </div>
              </div>
            </div>

            <div className="audit-table-container">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Usuário</th>
                    <th>Operação</th>
                    <th>Histórico</th>
                  </tr>
                </thead>
                <tbody>
                  {auditData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.data}</td>
                      <td>{item.hora}</td>
                      <td>{item.usuario}</td>
                      <td>
                        <span className={`operation-badge ${getOperationClass(item.operacao)}`}>
                          {getOperationText(item.operacao)}
                        </span>
                      </td>
                      <td>{item.historico}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="tab-content">
            <h3>Configurações</h3>
            <p>Funcionalidade em desenvolvimento...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dados-orgao-container">
      <div className="page-header">
        <h2>Dados do Órgão</h2>
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
            className={`tab-button ${activeTab === 'log-auditoria' ? 'active' : ''}`}
            onClick={() => setActiveTab('log-auditoria')}
          >
            LOG - Auditoria
          </button>
          <button 
            className={`tab-button ${activeTab === 'configuracoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('configuracoes')}
          >
            Configurações
          </button>
        </div>
        
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DadosOrgao;