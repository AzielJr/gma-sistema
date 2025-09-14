import React, { useState } from 'react';
import './Enquadramento.css';

const Enquadramento = () => {
  const [activeTab, setActiveTab] = useState('dados-processo');
  const [formData, setFormData] = useState({
    // Dados do Processo
    nomeContribuinte: '',
    cpfCnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    // Novos campos para Avaliador do porte / Potencial Poluidor
    qtdeUnidadeMedida: '',
    grauPoluidor: '',
    faixa: '',
    avaliadorPorte: '',
    numeroProcesso: '',
    dataProtocolo: '',
    tipoProcesso: '',
    situacao: '',
    codigoAtividade: '',
    descricaoAtividade: '',
    orgaoReferencia: '',
    
    // Classificação
    investimento: '',
    area: '',
    qtdFuncionarios: '',
    tipoFuncionario: '',
    nomeEmpreendimento: '',
    enderecoEmpreendimento: '',
    municipio: '',
    enquadramentoAmbiental: '',
    enquadramentoSanitario: '',
    faixaLicenciamento: '',
    valorInvestimento: '',
    numeroFuncionarios: '',
    faixaLicenciamentoFuncionarios: '',
    
    // Observação/Atividade Secundária
    observacao: '',
    atividadesSecundarias: [],
    
    // Dados do Contribuinte (original)
    cnpjCpf: '',
    situacaoCadastral: 'Ativo',
    numeroAnterior: '',
    numeroEnquadramento: '',
    razaoSocial: '',
    nomeFantasia: '',
    
    // Avaliador do porte
    portePotencialPoluidor: '',
    
    // Classificação da Atividade
    codigo: '',
    secao: '',
    divisao: '',
    grupo: '',
    classe: '',
    subClasse: '',
    digito: '',
    referencia: '',
    
    // Órgão de Referência
    cnae: false,
    coema: false,
    comam: false,
    urbana: false,
    
    // Selects adicionais
    tipoLicenca: '',
    tecnicoAmbiental: '',
    
    // Classificação - Investimento/Área
    capital: '',
    areaTotal: '',
    construida: '',
    utilizada: '',
    
    // Quadro Funcional
    direto: '',
    terceirizados: '',
    
    // Dados do Empreendimento
    unidadeMedida: '',
    quadroFuncional: '',
    
    // Enquadramentos
    tipoEnquadra: '',
    enquadramentos: '',
    
    // Faixas de Licenciamento
    faixaMicro: '',
    faixaMicroDe: '',
    faixaMicroAte: '',
    faixaPequeno: '',
    faixaPequenoDe: '',
    faixaPequenoAte: '',
    faixaMedio: '',
    faixaMedioDe: '',
    faixaMedioAte: '',
    faixaGrande: '',
    faixaGrandeDe: '',
    faixaGrandeAte: '',
    faixaEspecial: '',
    faixaEspecialDe: '',
    faixaEspecialAte: '',
    
    // Requerido x Enquadrado
    atividadeRequerida: '',
    codigoRequerida: '',
    secaoRequerida: '',
    divisaoRequerida: '',
    grupoRequerida: '',
    classeRequerida: '',
    subClasseRequerida: '',
    digitoRequerida: '',
    referenciaRequerida: '',
    cnaeRequerida: false,
    comamRequerida: false,
    coemaRequerida: false,
    urbanaRequerida: false,
    
    atividadeEnquadrada: '',
    codigoEnquadrada: '',
    secaoEnquadrada: '',
    divisaoEnquadrada: '',
    grupoEnquadrada: '',
    classeEnquadrada: '',
    subClasseEnquadrada: '',
    digitoEnquadrada: '',
    referenciaEnquadrada: '',
    cnaeEnquadrada: false,
    comamEnquadrada: false,
    coemaEnquadrada: false,
    urbanaEnquadrada: false
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Enquadramento salvo com sucesso!');
  };

  // Dados fictícios para as listas
  const processosHistorico = [
    {
      id: 1,
      data: '15/01/2024',
      numeroProcesso: '2024/001234',
      dataAnterior: '10/12/2023',
      numeroAnterior: '2023/005678',
      registro: 'REG001',
      cnae: '2511-0/00',
      tipoLicenca: 'LI'
    },
    {
      id: 2,
      data: '20/01/2024',
      numeroProcesso: '2024/001235',
      dataAnterior: '15/12/2023',
      numeroAnterior: '2023/005679',
      registro: 'REG002',
      cnae: '2512-8/00',
      tipoLicenca: 'LO'
    },
    {
      id: 3,
      data: '25/01/2024',
      numeroProcesso: '2024/001236',
      dataAnterior: '20/12/2023',
      numeroAnterior: '2023/005680',
      registro: 'REG003',
      cnae: '2513-6/00',
      tipoLicenca: 'LF'
    }
  ];

  const atividadesSecundarias = [
    {
      id: 1,
      codigo: '25.11',
      secao: 'C',
      divisao: '25',
      grupo: '251',
      classe: '2511',
      subClasse: '25110',
      digito: '0',
      referencia: 'REF001',
      nomenclatura: 'Fabricação de estruturas metálicas'
    },
    {
      id: 2,
      codigo: '25.12',
      secao: 'C',
      divisao: '25',
      grupo: '251',
      classe: '2512',
      subClasse: '25128',
      digito: '0',
      referencia: 'REF002',
      nomenclatura: 'Fabricação de esquadrias de metal'
    },
    {
      id: 3,
      codigo: '25.13',
      secao: 'C',
      divisao: '25',
      grupo: '251',
      classe: '2513',
      subClasse: '25136',
      digito: '0',
      referencia: 'REF003',
      nomenclatura: 'Fabricação de obras de caldeiraria pesada'
    }
  ];

  return (
    <div className="enquadramento-container">
      <div className="enquadramento-header">
        <h1>Enquadramento</h1>
        <div className="header-actions">
          <button type="button" className="btn-voltar">Voltar</button>
          <button type="button" className="btn-novo">Novo Enquadramento</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="enquadramento-form">
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              type="button"
              className={`tab-button ${activeTab === 'dados-processo' ? 'active' : ''}`}
              onClick={() => setActiveTab('dados-processo')}
            >
              Dados do Processo
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'classificacao' ? 'active' : ''}`}
              onClick={() => setActiveTab('classificacao')}
            >
              Classificação
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'observacao-atividade' ? 'active' : ''}`}
              onClick={() => setActiveTab('observacao-atividade')}
            >
              Observação / Atividade Secundária
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'requerido-enquadrado' ? 'active' : ''}`}
              onClick={() => setActiveTab('requerido-enquadrado')}
            >
              Requerido x Enquadrado
            </button>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'dados-processo' ? 'block' : 'none' }}>
            {/* Dados do Contribuinte */}
            <div className="form-group">
              <h3>Dados do Contribuinte</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cnpj">CNPJ:</label>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="situacaoCadastral">Situação Cadastral:</label>
                  <select
                    id="situacaoCadastral"
                    name="situacaoCadastral"
                    value={formData.situacaoCadastral}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="suspenso">Suspenso</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="numeroProcesso">Nº Processo:</label>
                  <input
                    type="text"
                    id="numeroProcesso"
                    name="numeroProcesso"
                    value={formData.numeroProcesso}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="numeroAnterior">Nº Anterior:</label>
                  <input
                    type="text"
                    id="numeroAnterior"
                    name="numeroAnterior"
                    value={formData.numeroAnterior}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="numeroEnquadramento">Nº Enquadramento:</label>
                  <input
                    type="text"
                    id="numeroEnquadramento"
                    name="numeroEnquadramento"
                    value={formData.numeroEnquadramento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="razaoSocial">Razão Social:</label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="nomeFantasia">Nome Fantasia:</label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Avaliador do Porte / Potencial poluidor - Faixa de Licenciamento */}
            <div className="form-group">
              <h3>Avaliador do Porte / Potencial poluidor - Faixa de Licenciamento</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="unidadeMedida">Unidade de Medida:</label>
                  <input
                    type="text"
                    id="unidadeMedida"
                    name="unidadeMedida"
                    value={formData.unidadeMedida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="portePotencialPoluidor">Porte / Potencial Poluidor:</label>
                  <input
                    type="text"
                    id="portePotencialPoluidor"
                    name="portePotencialPoluidor"
                    value={formData.portePotencialPoluidor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grauPoluidor">Grau Poluidor:</label>
                  <select
                    id="grauPoluidor"
                    name="grauPoluidor"
                    value={formData.grauPoluidor}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="baixo">Baixo</option>
                    <option value="medio">Médio</option>
                    <option value="alto">Alto</option>
                    <option value="excepcional">Excepcional</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixa">Faixa:</label>
                  <input
                    type="text"
                    id="faixa"
                    name="faixa"
                    value={formData.faixa}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Dados do Processo */}
            <div className="form-group">
              <h3>Dados do Processo</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="atividadePrincipal">Atividade Principal:</label>
                  <select
                    id="atividadePrincipal"
                    name="atividadePrincipal"
                    value={formData.atividadePrincipal}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="fabricacao-metalurgica">Fabricação Metalúrgica</option>
                    <option value="industria-quimica">Indústria Química</option>
                    <option value="construcao-civil">Construção Civil</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Classificação da Atividade */}
            <div className="form-group">
              <h3>Classificação da Atividade</h3>
              <div className="form-row classificacao-row">
                <div className="form-field">
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="secao">Seção:</label>
                  <input
                    type="text"
                    id="secao"
                    name="secao"
                    value={formData.secao}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="divisao">Divisão:</label>
                  <input
                    type="text"
                    id="divisao"
                    name="divisao"
                    value={formData.divisao}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grupo">Grupo:</label>
                  <input
                    type="text"
                    id="grupo"
                    name="grupo"
                    value={formData.grupo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="classe">Classe:</label>
                  <input
                    type="text"
                    id="classe"
                    name="classe"
                    value={formData.classe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subClasse">Sub-Classe:</label>
                  <input
                    type="text"
                    id="subClasse"
                    name="subClasse"
                    value={formData.subClasse}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="digito">Dígito:</label>
                  <input
                    type="text"
                    id="digito"
                    name="digito"
                    value={formData.digito}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="referencia">Referência:</label>
                  <input
                    type="text"
                    id="referencia"
                    name="referencia"
                    value={formData.referencia}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Órgão de Referência */}
            <div className="form-group">
              <h3>Órgão de Referência</h3>
              <div className="checkbox-group">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="cnae"
                    name="cnae"
                    checked={formData.cnae}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cnae">0 - CNAE</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="coema"
                    name="coema"
                    checked={formData.coema}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="coema">1 - COEMA</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="comam"
                    name="comam"
                    checked={formData.comam}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="comam">2 - COMAM</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="urbana"
                    name="urbana"
                    checked={formData.urbana}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="urbana">3 - URBANA</label>
                </div>
              </div>
            </div>

            {/* Divisão e campos adicionais */}
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="tipoLicenca">Tipo de Licença:</label>
                <select
                  id="tipoLicenca"
                  name="tipoLicenca"
                  value={formData.tipoLicenca}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  <option value="LI">LI - Licença de Instalação</option>
                  <option value="LO">LO - Licença de Operação</option>
                  <option value="LF">LF - Licença de Funcionamento</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="tecnicoAmbiental">Técnico Ambiental:</label>
                <select
                  id="tecnicoAmbiental"
                  name="tecnicoAmbiental"
                  value={formData.tecnicoAmbiental}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  <option value="joao-silva">João Silva</option>
                  <option value="maria-santos">Maria Santos</option>
                  <option value="pedro-oliveira">Pedro Oliveira</option>
                </select>
              </div>
            </div>

            <div className="form-divider"></div>

            {/* Lista de Histórico */}
            <div className="form-group">
              <h3>Histórico de Processos</h3>
              <div className="table-container">
                <table className="processos-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Nº Processo</th>
                      <th>Data Anterior</th>
                      <th>Nº Anterior</th>
                      <th>Registro</th>
                      <th>CNAE</th>
                      <th>Tipo de Licença</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processosHistorico.map(processo => (
                      <tr key={processo.id}>
                        <td>{processo.data}</td>
                        <td>{processo.numeroProcesso}</td>
                        <td>{processo.dataAnterior}</td>
                        <td>{processo.numeroAnterior}</td>
                        <td>{processo.registro}</td>
                        <td>{processo.cnae}</td>
                        <td>{processo.tipoLicenca}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

           <div className="tab-content" style={{ display: activeTab === 'classificacao' ? 'block' : 'none' }}>
            {/* Investimento / Área */}
            <div className="form-group">
              <h3>Investimento / Área</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="capital">Capital:</label>
                  <input
                    type="text"
                    id="capital"
                    name="capital"
                    value={formData.capital}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="areaTotal">Área Total:</label>
                  <input
                    type="text"
                    id="areaTotal"
                    name="areaTotal"
                    value={formData.areaTotal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="construida">Construída:</label>
                  <input
                    type="text"
                    id="construida"
                    name="construida"
                    value={formData.construida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="utilizada">Utilizada:</label>
                  <input
                    type="text"
                    id="utilizada"
                    name="utilizada"
                    value={formData.utilizada}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Quadro Funcional */}
            <div className="form-group">
              <h3>Quadro Funcional</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="direto">Direto:</label>
                  <input
                    type="text"
                    id="direto"
                    name="direto"
                    value={formData.direto}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="terceirizados">Terceirizados:</label>
                  <input
                    type="text"
                    id="terceirizados"
                    name="terceirizados"
                    value={formData.terceirizados}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Dados do Empreendimento */}
            <div className="form-group">
              <h3>Dados do Empreendimento</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="area">Área:</label>
                  <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="urbana">Urbana</option>
                    <option value="rural">Rural</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="unidadeMedida">Unidade de Medida:</label>
                  <select
                    id="unidadeMedida"
                    name="unidadeMedida"
                    value={formData.unidadeMedida}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="m2">m²</option>
                    <option value="ha">Hectare</option>
                    <option value="km2">km²</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="investimento">Investimento:</label>
                  <select
                    id="investimento"
                    name="investimento"
                    value={formData.investimento}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="micro">Micro</option>
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="quadroFuncional">Quadro Funcional:</label>
                  <select
                    id="quadroFuncional"
                    name="quadroFuncional"
                    value={formData.quadroFuncional}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Enquadramentos */}
            <div className="form-group">
              <h3>Enquadramentos</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="tipoEnquadra">Tipo de Enquadra:</label>
                  <select
                    id="tipoEnquadra"
                    name="tipoEnquadra"
                    value={formData.tipoEnquadra}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="simplificado">Simplificado</option>
                    <option value="ordinario">Ordinário</option>
                    <option value="especial">Especial</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="enquadramentos">Enquadramentos:</label>
                  <select
                    id="enquadramentos"
                    name="enquadramentos"
                    value={formData.enquadramentos}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="classe-1">Classe 1</option>
                    <option value="classe-2">Classe 2</option>
                    <option value="classe-3">Classe 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Faixas de Licenciamento */}
            <div className="form-group">
              <h3>Faixas de Licenciamento</h3>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="faixaMicro">1-Faixa de Licenciamento Micro:</label>
                  <select
                    id="faixaMicro"
                    name="faixaMicro"
                    value={formData.faixaMicro}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixaMicroDe">De:</label>
                  <input
                    type="number"
                    id="faixaMicroDe"
                    name="faixaMicroDe"
                    value={formData.faixaMicroDe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="faixaMicroAte">Até:</label>
                  <input
                    type="number"
                    id="faixaMicroAte"
                    name="faixaMicroAte"
                    value={formData.faixaMicroAte}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="faixaPequeno">2-Faixa de Licenciamento Pequeno:</label>
                  <select
                    id="faixaPequeno"
                    name="faixaPequeno"
                    value={formData.faixaPequeno}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativa">Ativa</option>
                    <option value="inativa">Inativa</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixaPequenoDe">De:</label>
                  <input
                    type="number"
                    id="faixaPequenoDe"
                    name="faixaPequenoDe"
                    value={formData.faixaPequenoDe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="faixaPequenoAte">Até:</label>
                  <input
                    type="number"
                    id="faixaPequenoAte"
                    name="faixaPequenoAte"
                    value={formData.faixaPequenoAte}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="faixaMedio">3-Faixa de Licenciamento Médio:</label>
                  <select
                    id="faixaMedio"
                    name="faixaMedio"
                    value={formData.faixaMedio}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativa">Ativa</option>
                    <option value="inativa">Inativa</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixaMedioDe">De:</label>
                  <input
                    type="number"
                    id="faixaMedioDe"
                    name="faixaMedioDe"
                    value={formData.faixaMedioDe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="faixaMedioAte">Até:</label>
                  <input
                    type="number"
                    id="faixaMedioAte"
                    name="faixaMedioAte"
                    value={formData.faixaMedioAte}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="faixaGrande">4-Faixa de Licenciamento Grande:</label>
                  <select
                    id="faixaGrande"
                    name="faixaGrande"
                    value={formData.faixaGrande}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativa">Ativa</option>
                    <option value="inativa">Inativa</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixaGrandeDe">De:</label>
                  <input
                    type="number"
                    id="faixaGrandeDe"
                    name="faixaGrandeDe"
                    value={formData.faixaGrandeDe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="faixaGrandeAte">Até:</label>
                  <input
                    type="number"
                    id="faixaGrandeAte"
                    name="faixaGrandeAte"
                    value={formData.faixaGrandeAte}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="faixaEspecial">5-Faixa de Licenciamento Especial:</label>
                  <select
                    id="faixaEspecial"
                    name="faixaEspecial"
                    value={formData.faixaEspecial}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="ativa">Ativa</option>
                    <option value="inativa">Inativa</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="faixaEspecialDe">De:</label>
                  <input
                    type="number"
                    id="faixaEspecialDe"
                    name="faixaEspecialDe"
                    value={formData.faixaEspecialDe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="faixaEspecialAte">Até:</label>
                  <input
                    type="number"
                    id="faixaEspecialAte"
                    name="faixaEspecialAte"
                    value={formData.faixaEspecialAte}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>


          <div className="tab-content" style={{ display: activeTab === 'observacao-atividade' ? 'block' : 'none' }}>
            {/* Campo Observação */}
            <div className="form-group">
              <h3>Observação</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="observacao">Observação:</label>
                  <textarea
                    id="observacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Digite suas observações..."
                  />
                </div>
              </div>
            </div>

            {/* Lista de Atividades Secundárias */}
            <div className="form-group">
              <h3>Atividades Secundárias</h3>
              <div className="table-container">
                <table className="atividades-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Seção</th>
                      <th>Divisão</th>
                      <th>Grupo</th>
                      <th>Classe</th>
                      <th>Sub-Classe</th>
                      <th>Dígito</th>
                      <th>Referência</th>
                      <th>Nomenclatura da atividade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividadesSecundarias.map(atividade => (
                      <tr key={atividade.id}>
                        <td>{atividade.codigo}</td>
                        <td>{atividade.secao}</td>
                        <td>{atividade.divisao}</td>
                        <td>{atividade.grupo}</td>
                        <td>{atividade.classe}</td>
                        <td>{atividade.subClasse}</td>
                        <td>{atividade.digito}</td>
                        <td>{atividade.referencia}</td>
                        <td>{atividade.nomenclatura}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div className="tab-content" style={{ display: activeTab === 'requerido-enquadrado' ? 'block' : 'none' }}>
            {/* Dados da Atividade Requerida */}
            <div className="form-group">
              <h3>Dados da Atividade Requerida</h3>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="atividadeRequerida">Atividade:</label>
                  <select
                    id="atividadeRequerida"
                    name="atividadeRequerida"
                    value={formData.atividadeRequerida}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="fabricacao-metalurgica">Fabricação Metalúrgica</option>
                    <option value="industria-quimica">Indústria Química</option>
                    <option value="construcao-civil">Construção Civil</option>
                  </select>
                </div>
              </div>

              <h4>Classificação da Atividade</h4>
              <div className="form-divider"></div>
              <div className="form-row classificacao-row">
                <div className="form-field">
                  <label htmlFor="codigoRequerida">Código:</label>
                  <input
                    type="text"
                    id="codigoRequerida"
                    name="codigoRequerida"
                    value={formData.codigoRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="secaoRequerida">Seção:</label>
                  <input
                    type="text"
                    id="secaoRequerida"
                    name="secaoRequerida"
                    value={formData.secaoRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="divisaoRequerida">Divisão:</label>
                  <input
                    type="text"
                    id="divisaoRequerida"
                    name="divisaoRequerida"
                    value={formData.divisaoRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grupoRequerida">Grupo:</label>
                  <input
                    type="text"
                    id="grupoRequerida"
                    name="grupoRequerida"
                    value={formData.grupoRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="classeRequerida">Classe:</label>
                  <input
                    type="text"
                    id="classeRequerida"
                    name="classeRequerida"
                    value={formData.classeRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subClasseRequerida">Sub-Classe:</label>
                  <input
                    type="text"
                    id="subClasseRequerida"
                    name="subClasseRequerida"
                    value={formData.subClasseRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="digitoRequerida">Dígito:</label>
                  <input
                    type="text"
                    id="digitoRequerida"
                    name="digitoRequerida"
                    value={formData.digitoRequerida}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="referenciaRequerida">Referência:</label>
                  <input
                    type="text"
                    id="referenciaRequerida"
                    name="referenciaRequerida"
                    value={formData.referenciaRequerida}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <h4>Órgão de Referência</h4>
              <div className="form-divider-small"></div>
              <div className="checkbox-group">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="cnaeRequerida"
                    name="cnaeRequerida"
                    checked={formData.cnaeRequerida}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cnaeRequerida">0 - CNAE</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="comamRequerida"
                    name="comamRequerida"
                    checked={formData.comamRequerida}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="comamRequerida">1 - COMAM</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="coemaRequerida"
                    name="coemaRequerida"
                    checked={formData.coemaRequerida}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="coemaRequerida">2 - COEMA</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="urbanaRequerida"
                    name="urbanaRequerida"
                    checked={formData.urbanaRequerida}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="urbanaRequerida">3 - URBANA</label>
                </div>
              </div>
            </div>

            {/* Dados da Atividade Enquadrada */}
            <div className="form-group">
              <h3>Dados da Atividade Enquadrada</h3>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="atividadeEnquadrada">Atividade:</label>
                  <select
                    id="atividadeEnquadrada"
                    name="atividadeEnquadrada"
                    value={formData.atividadeEnquadrada}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="agricultura">Agricultura</option>
                    <option value="industria">Indústria</option>
                    <option value="comercio">Comércio</option>
                  </select>
                </div>
              </div>

              <h4>Classificação da Atividade</h4>
              <div className="form-divider-small"></div>
              <div className="form-row classificacao-atividade">
                <div className="form-field">
                  <label htmlFor="codigoEnquadrada">Código:</label>
                  <input
                    type="text"
                    id="codigoEnquadrada"
                    name="codigoEnquadrada"
                    value={formData.codigoEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="secaoEnquadrada">Seção:</label>
                  <input
                    type="text"
                    id="secaoEnquadrada"
                    name="secaoEnquadrada"
                    value={formData.secaoEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="divisaoEnquadrada">Divisão:</label>
                  <input
                    type="text"
                    id="divisaoEnquadrada"
                    name="divisaoEnquadrada"
                    value={formData.divisaoEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grupoEnquadrada">Grupo:</label>
                  <input
                    type="text"
                    id="grupoEnquadrada"
                    name="grupoEnquadrada"
                    value={formData.grupoEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="classeEnquadrada">Classe:</label>
                  <input
                    type="text"
                    id="classeEnquadrada"
                    name="classeEnquadrada"
                    value={formData.classeEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subClasseEnquadrada">Sub-Classe:</label>
                  <input
                    type="text"
                    id="subClasseEnquadrada"
                    name="subClasseEnquadrada"
                    value={formData.subClasseEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="digitoEnquadrada">Dígito:</label>
                  <input
                    type="text"
                    id="digitoEnquadrada"
                    name="digitoEnquadrada"
                    value={formData.digitoEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="referenciaEnquadrada">Referência:</label>
                  <input
                    type="text"
                    id="referenciaEnquadrada"
                    name="referenciaEnquadrada"
                    value={formData.referenciaEnquadrada}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <h4>Órgão de Referência</h4>
              <div className="form-divider-small"></div>
              <div className="checkbox-group">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="cnaeEnquadrada"
                    name="cnaeEnquadrada"
                    checked={formData.cnaeEnquadrada}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cnaeEnquadrada">0 - CNAE</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="comamEnquadrada"
                    name="comamEnquadrada"
                    checked={formData.comamEnquadrada}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="comamEnquadrada">1 - COMAM</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="coemaEnquadrada"
                    name="coemaEnquadrada"
                    checked={formData.coemaEnquadrada}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="coemaEnquadrada">2 - COEMA</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="urbanaEnquadrada"
                    name="urbanaEnquadrada"
                    checked={formData.urbanaEnquadrada}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="urbanaEnquadrada">3 - URBANA</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-submit">Salvar Enquadramento</button>
        </div>
      </form>
    </div>
  );
};

export default Enquadramento;