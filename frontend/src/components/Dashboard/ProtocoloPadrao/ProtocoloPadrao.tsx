import React, { useState } from 'react';
import './ProtocoloPadrao.css';

interface DocumentoItem {
  id: number;
  reg: string;
  data: string;
  identificador: string;
  codigo: string;
  tp: string;
  prazo: string;
  documentacao: string;
}

interface Protocolo {
  id: number;
  tipoDocumento: string;
  acaoProtocolar: string;
  protocolo: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  tipoVolume: string;
  quantidade: string;
  localizacao: string;
  processo: string;
  processoAnterior: string;
  data: string;
  cnpjCpf: string;
  inscMunicipal: string;
  inscEstadual: string;
  dnpm: string;
  situacaoCadastral: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subClasse: string;
  digito: string;
  referencia: string;
  tipoAtividade: string;
  capital: string;
  areaTotal: string;
  areaConstruida: string;
  areaUtilizada: string;
  empregadosDireto: string;
  terceirizados: string;
  tipoLicenca: string;
  tecnicoAmbiental: string;
  documentosBasico: DocumentoItem[];
  documentosTecnico: DocumentoItem[];
  projetos: DocumentoItem[];
  diretrizes: DocumentoItem[];
}

interface FormData {
  tipoDocumento: string;
  acaoProtocolar: string;
  protocolo: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  tipoVolume: string;
  quantidade: string;
  localizacao: string;
  processo: string;
  processoAnterior: string;
  data: string;
  cnpjCpf: string;
  inscMunicipal: string;
  inscEstadual: string;
  dnpm: string;
  situacaoCadastral: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subClasse: string;
  digito: string;
  referencia: string;
  tipoAtividade: string;
  capital: string;
  areaTotal: string;
  areaConstruida: string;
  areaUtilizada: string;
  empregadosDireto: string;
  terceirizados: string;
  tipoLicenca: string;
  tecnicoAmbiental: string;
  documentosBasico: DocumentoItem[];
  documentosTecnico: DocumentoItem[];
  projetos: DocumentoItem[];
  diretrizes: DocumentoItem[];
}

const ProtocoloPadrao: React.FC = () => {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [filteredProtocolos, setFilteredProtocolos] = useState<Protocolo[]>([
    {
      id: 1,
      tipoDocumento: 'Licença Ambiental',
      acaoProtocolar: 'Renovação',
      protocolo: '2024001234',
      cnpj: '12.345.678/0001-90',
      razaoSocial: 'Empresa Exemplo Ltda',
      nomeFantasia: 'Exemplo Corp',
      tipoVolume: 'Digital',
      quantidade: '1',
      localizacao: 'Arquivo Central',
      processo: '2024.001.001',
      processoAnterior: '2021.001.001',
      data: '2024-01-15',
      cnpjCpf: '12.345.678/0001-90',
      inscMunicipal: '123456',
      inscEstadual: '123.456.789.012',
      dnpm: '',
      situacaoCadastral: 'Ativa',
      secao: 'C',
      divisao: '10',
      grupo: '101',
      classe: '1011',
      subClasse: '10111',
      digito: '1',
      referencia: 'REF001',
      tipoAtividade: 'Industrial',
      capital: '500000.00',
      areaTotal: '10000.00',
      areaConstruida: '5000.00',
      areaUtilizada: '4500.00',
      empregadosDireto: '50',
      terceirizados: '10',
      tipoLicenca: 'LO - Licença de Operação',
      tecnicoAmbiental: 'João Silva - CREA 123456',
      documentosBasico: [
        {
          id: 1,
          reg: '001',
          data: '2024-01-15',
          identificador: 'DOC001',
          codigo: 'LIC001',
          tp: 'Original',
          prazo: '30 dias',
          documentacao: 'Requerimento de Licença'
        }
      ],
      documentosTecnico: [],
      projetos: [],
      diretrizes: []
    },
    {
      id: 2,
      tipoDocumento: 'Autorização Ambiental',
      acaoProtocolar: 'Nova Solicitação',
      protocolo: '2024001235',
      cnpj: '98.765.432/0001-10',
      razaoSocial: 'Indústria Verde S.A.',
      nomeFantasia: 'Verde Industrial',
      tipoVolume: 'Físico',
      quantidade: '2',
      localizacao: 'Protocolo Geral',
      processo: '2024.002.001',
      processoAnterior: '',
      data: '2024-01-20',
      cnpjCpf: '98.765.432/0001-10',
      inscMunicipal: '654321',
      inscEstadual: '987.654.321.098',
      dnpm: '12345',
      situacaoCadastral: 'Ativa',
      secao: 'B',
      divisao: '08',
      grupo: '081',
      classe: '0810',
      subClasse: '08101',
      digito: '2',
      referencia: 'REF002',
      tipoAtividade: 'Mineração',
      capital: '1000000.00',
      areaTotal: '25000.00',
      areaConstruida: '8000.00',
      areaUtilizada: '7500.00',
      empregadosDireto: '120',
      terceirizados: '30',
      tipoLicenca: 'LP - Licença Prévia',
      tecnicoAmbiental: 'Maria Santos - CREA 654321',
      documentosBasico: [
        {
          id: 1,
          reg: '002',
          data: '2024-01-20',
          identificador: 'DOC002',
          codigo: 'AUT001',
          tp: 'Cópia',
          prazo: '45 dias',
          documentacao: 'Estudo de Impacto Ambiental'
        }
      ],
      documentosTecnico: [
        {
          id: 1,
          reg: '003',
          data: '2024-01-20',
          identificador: 'TEC001',
          codigo: 'RIMA001',
          tp: 'Original',
          prazo: '60 dias',
          documentacao: 'RIMA - Relatório de Impacto'
        }
      ],
      projetos: [],
      diretrizes: []
    },
    {
      id: 3,
      tipoDocumento: 'Outorga de Uso da Água',
      acaoProtocolar: 'Alteração',
      protocolo: '2024001236',
      cnpj: '11.222.333/0001-44',
      razaoSocial: 'Agropecuária Sustentável Ltda',
      nomeFantasia: 'AgroSus',
      tipoVolume: 'Digital',
      quantidade: '1',
      localizacao: 'Arquivo Digital',
      processo: '2024.003.001',
      processoAnterior: '2020.003.001',
      data: '2024-01-25',
      cnpjCpf: '11.222.333/0001-44',
      inscMunicipal: '789012',
      inscEstadual: '111.222.333.444',
      dnpm: '',
      situacaoCadastral: 'Ativa',
      secao: 'A',
      divisao: '01',
      grupo: '011',
      classe: '0111',
      subClasse: '01111',
      digito: '3',
      referencia: 'REF003',
      tipoAtividade: 'Agropecuária',
      capital: '750000.00',
      areaTotal: '50000.00',
      areaConstruida: '2000.00',
      areaUtilizada: '45000.00',
      empregadosDireto: '25',
      terceirizados: '15',
      tipoLicenca: 'Outorga de Uso da Água',
      tecnicoAmbiental: 'Carlos Oliveira - CREA 789012',
      documentosBasico: [],
      documentosTecnico: [],
      projetos: [
        {
          id: 1,
          reg: '004',
          data: '2024-01-25',
          identificador: 'PROJ001',
          codigo: 'IRR001',
          tp: 'Original',
          prazo: '90 dias',
          documentacao: 'Projeto de Irrigação'
        }
      ],
      diretrizes: [
        {
          id: 1,
          reg: '005',
          data: '2024-01-25',
          identificador: 'DIR001',
          codigo: 'USO001',
          tp: 'Original',
          prazo: '30 dias',
          documentacao: 'Diretrizes de Uso da Água'
        }
      ]
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dados-protocolo');
  const [formData, setFormData] = useState<FormData>({
    tipoDocumento: '',
    acaoProtocolar: '',
    protocolo: '',
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    tipoVolume: '',
    quantidade: '',
    localizacao: '',
    processo: '',
    processoAnterior: '',
    data: '',
    cnpjCpf: '',
    inscMunicipal: '',
    inscEstadual: '',
    dnpm: '',
    situacaoCadastral: '',
    secao: '',
    divisao: '',
    grupo: '',
    classe: '',
    subClasse: '',
    digito: '',
    referencia: '',
    tipoAtividade: '',
    capital: '',
    areaTotal: '',
    areaConstruida: '',
    areaUtilizada: '',
    empregadosDireto: '',
    terceirizados: '',
    tipoLicenca: '',
    tecnicoAmbiental: '',
    documentosBasico: [],
    documentosTecnico: [],
    projetos: [],
    diretrizes: []
  });

  const addDocumentoItem = (listType: keyof Pick<FormData, 'documentosBasico' | 'documentosTecnico' | 'projetos' | 'diretrizes'>) => {
    const newItem: DocumentoItem = {
      id: Date.now(),
      reg: '',
      data: '',
      identificador: '',
      codigo: '',
      tp: '',
      prazo: '',
      documentacao: ''
    };

    setFormData(prev => ({
      ...prev,
      [listType]: [...prev[listType], newItem]
    }));
  };

  const removeDocumentoItem = (listType: keyof Pick<FormData, 'documentosBasico' | 'documentosTecnico' | 'projetos' | 'diretrizes'>, itemId: number) => {
    setFormData(prev => ({
      ...prev,
      [listType]: prev[listType].filter(item => item.id !== itemId)
    }));
  };

  const updateDocumentoItem = (
    listType: keyof Pick<FormData, 'documentosBasico' | 'documentosTecnico' | 'projetos' | 'diretrizes'>,
    itemId: number,
    field: keyof DocumentoItem,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [listType]: prev[listType].map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const renderDocumentosList = (title: string, listType: keyof Pick<FormData, 'documentosBasico' | 'documentosTecnico' | 'projetos' | 'diretrizes'>) => {
    const items = formData[listType];

    return (
      <div className="documentos-list" key={listType}>
        <div className="list-header">
          <h4>{title}</h4>
          <button
            type="button"
            className="btn-add-documento"
            onClick={() => addDocumentoItem(listType)}
          >
            + Adicionar
          </button>
        </div>
        
        {items.length > 0 && (
          <div className="documentos-table">
            <table>
              <thead>
                <tr>
                  <th>Reg</th>
                  <th>Data</th>
                  <th>Identificador</th>
                  <th>Código</th>
                  <th>TP</th>
                  <th>Prazo</th>
                  <th>Documentação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="text"
                        value={item.reg}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'reg', e.target.value)}
                        placeholder="Reg"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={item.data}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'data', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.identificador}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'identificador', e.target.value)}
                        placeholder="Identificador"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.codigo}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'codigo', e.target.value)}
                        placeholder="Código"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.tp}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'tp', e.target.value)}
                        placeholder="TP"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.prazo}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'prazo', e.target.value)}
                        placeholder="Prazo"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.documentacao}
                        onChange={(e) => updateDocumentoItem(listType, item.id, 'documentacao', e.target.value)}
                        placeholder="Documentação"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-remove-documento"
                        onClick={() => removeDocumentoItem(listType, item.id)}
                        title="Remover item"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {items.length === 0 && (
          <div className="no-documentos">
            <p>Nenhum documento adicionado. Clique em \"+ Adicionar\" para incluir itens.</p>
          </div>
        )}
      </div>
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredProtocolos(protocolos);
    } else {
      const filtered = protocolos.filter(protocolo =>
        protocolo.tipoDocumento.toLowerCase().includes(term.toLowerCase()) ||
        protocolo.protocolo.toLowerCase().includes(term.toLowerCase()) ||
        protocolo.razaoSocial.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProtocolos(filtered);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setProtocolos(prev => prev.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
      setFilteredProtocolos(prev => prev.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
    } else {
      const newProtocolo: Protocolo = {
        ...formData,
        id: Date.now()
      };
      setProtocolos(prev => [...prev, newProtocolo]);
      setFilteredProtocolos(prev => [...prev, newProtocolo]);
    }
    
    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      tipoDocumento: '',
      acaoProtocolar: '',
      protocolo: '',
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      tipoVolume: '',
      quantidade: '',
      localizacao: '',
      processo: '',
      processoAnterior: '',
      data: '',
      cnpjCpf: '',
      inscMunicipal: '',
      inscEstadual: '',
      dnpm: '',
      situacaoCadastral: '',
      secao: '',
      divisao: '',
      grupo: '',
      classe: '',
      subClasse: '',
      digito: '',
      referencia: '',
      tipoAtividade: '',
      capital: '',
      areaTotal: '',
      areaConstruida: '',
      areaUtilizada: '',
      empregadosDireto: '',
      terceirizados: '',
      tipoLicenca: '',
      tecnicoAmbiental: '',
      documentosBasico: [],
      documentosTecnico: [],
      projetos: [],
      diretrizes: []
    });
  };

  const handleEdit = (protocolo: Protocolo) => {
    setFormData(protocolo);
    setEditingId(protocolo.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este protocolo?')) {
      setProtocolos(prev => prev.filter(p => p.id !== id));
      setFilteredProtocolos(prev => prev.filter(p => p.id !== id));
    }
  };

  if (showForm) {
    return (
      <div className="protocolo-padrao-container">
        <div className="protocolo-header">
          <div className="header-content">
            <h2>{editingId ? 'Editar Protocolo Padrão' : 'Cadastrar Protocolo Padrão'}</h2>
            <div className="header-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancel}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="protocolo-form">
          <div className="form-tabs">
            <button
              type="button"
              className={`tab-button ${activeTab === 'dados-protocolo' ? 'active' : ''}`}
              onClick={() => setActiveTab('dados-protocolo')}
            >
              Dados do Protocolo
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'dados-processo' ? 'active' : ''}`}
              onClick={() => setActiveTab('dados-processo')}
            >
              Dados do Processo
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'documentos-protocolados' ? 'active' : ''}`}
              onClick={() => setActiveTab('documentos-protocolados')}
            >
              Documentos Protocolados
            </button>
          </div>

          <div className="form-content">
            {activeTab === 'dados-protocolo' && (
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Documento:</label>
                    <select
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Licenciamento">Licenciamento</option>
                      <option value="Autorização">Autorização</option>
                      <option value="Outorga">Outorga</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ação a Protocolar:</label>
                    <select
                      name="acaoProtocolar"
                      value={formData.acaoProtocolar}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Solicitação">Solicitação</option>
                      <option value="Renovação">Renovação</option>
                      <option value="Alteração">Alteração</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Protocolo:</label>
                    <input
                      type="text"
                      name="protocolo"
                      value={formData.protocolo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CNPJ:</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Razão Social:</label>
                    <input
                      type="text"
                      name="razaoSocial"
                      value={formData.razaoSocial}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nome Fantasia:</label>
                    <input
                      type="text"
                      name="nomeFantasia"
                      value={formData.nomeFantasia}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Volume:</label>
                    <select
                      name="tipoVolume"
                      value={formData.tipoVolume}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Físico">Físico</option>
                      <option value="Digital">Digital</option>
                      <option value="Misto">Misto</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantidade:</label>
                    <input
                      type="number"
                      name="quantidade"
                      value={formData.quantidade}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Localização:</label>
                    <input
                      type="text"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Processo:</label>
                    <input
                      type="text"
                      name="processo"
                      value={formData.processo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Processo Anterior:</label>
                    <input
                      type="text"
                      name="processoAnterior"
                      value={formData.processoAnterior}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Data:</label>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dados-processo' && (
              <div className="form-section">
                <h3>Dados do Contribuinte</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>CNPJ/CPF:</label>
                    <input
                      type="text"
                      name="cnpjCpf"
                      value={formData.cnpjCpf}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Inscrição Municipal:</label>
                    <input
                      type="text"
                      name="inscMunicipal"
                      value={formData.inscMunicipal}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Inscrição Estadual:</label>
                    <input
                      type="text"
                      name="inscEstadual"
                      value={formData.inscEstadual}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>DNPM:</label>
                    <input
                      type="text"
                      name="dnpm"
                      value={formData.dnpm}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Situação Cadastral:</label>
                    <select
                      name="situacaoCadastral"
                      value={formData.situacaoCadastral}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Ativa">Ativa</option>
                      <option value="Inativa">Inativa</option>
                      <option value="Suspensa">Suspensa</option>
                    </select>
                  </div>
                </div>

                <h3>Atividades</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Seção:</label>
                    <input
                      type="text"
                      name="secao"
                      value={formData.secao}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Divisão:</label>
                    <input
                      type="text"
                      name="divisao"
                      value={formData.divisao}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Grupo:</label>
                    <input
                      type="text"
                      name="grupo"
                      value={formData.grupo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Classe:</label>
                    <input
                      type="text"
                      name="classe"
                      value={formData.classe}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Sub-Classe:</label>
                    <input
                      type="text"
                      name="subClasse"
                      value={formData.subClasse}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dígito:</label>
                    <input
                      type="text"
                      name="digito"
                      value={formData.digito}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Referência:</label>
                    <input
                      type="text"
                      name="referencia"
                      value={formData.referencia}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo de Atividade:</label>
                    <select
                      name="tipoAtividade"
                      value={formData.tipoAtividade}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Principal">Principal</option>
                      <option value="Secundária">Secundária</option>
                    </select>
                  </div>
                </div>

                <h3>Dados do Empreendimento</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Capital:</label>
                    <input
                      type="text"
                      name="capital"
                      value={formData.capital}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Área Total (m²):</label>
                    <input
                      type="text"
                      name="areaTotal"
                      value={formData.areaTotal}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Área Construída (m²):</label>
                    <input
                      type="text"
                      name="areaConstruida"
                      value={formData.areaConstruida}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Área Utilizada (m²):</label>
                    <input
                      type="text"
                      name="areaUtilizada"
                      value={formData.areaUtilizada}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Empregados Direto:</label>
                    <input
                      type="number"
                      name="empregadosDireto"
                      value={formData.empregadosDireto}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Terceirizados:</label>
                    <input
                      type="number"
                      name="terceirizados"
                      value={formData.terceirizados}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3>Dados do Processo</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Licença:</label>
                    <select
                      name="tipoLicenca"
                      value={formData.tipoLicenca}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="Licença Prévia">Licença Prévia</option>
                      <option value="Licença de Instalação">Licença de Instalação</option>
                      <option value="Licença de Operação">Licença de Operação</option>
                      <option value="Licença Única">Licença Única</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Técnico Ambiental:</label>
                    <input
                      type="text"
                      name="tecnicoAmbiental"
                      value={formData.tecnicoAmbiental}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documentos-protocolados' && (
              <div className="form-section">
                <div className="documentos-protocolados">
                  {renderDocumentosList('Documentos Básico', 'documentosBasico')}
                  {renderDocumentosList('Documentos Técnico', 'documentosTecnico')}
                  {renderDocumentosList('Projetos', 'projetos')}
                  {renderDocumentosList('Diretrizes', 'diretrizes')}
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="protocolo-padrao-container">
      <div className="protocolo-header">
        <div className="header-content">
          <h2>Protocolo Padrão</h2>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Buscar por razão social, protocolo ou CNPJ..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      <div className="protocolo-content">
        <div className="protocolo-table">
          <table>
            <thead>
              <tr>
                <th>Tipo de Documento</th>
                <th>Ação a Protocolar</th>
                <th>Protocolo</th>
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProtocolos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-data">
                    Nenhum protocolo encontrado. Clique em \"Cadastrar\" para adicionar um novo protocolo.
                  </td>
                </tr>
              ) : (
                filteredProtocolos.map((protocolo) => (
                  <tr key={protocolo.id}>
                    <td>{protocolo.tipoDocumento}</td>
                    <td>{protocolo.acaoProtocolar}</td>
                    <td>{protocolo.protocolo}</td>
                    <td>{protocolo.cnpj}</td>
                    <td>{protocolo.razaoSocial}</td>
                    <td>{protocolo.data}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(protocolo)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(protocolo.id)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProtocoloPadrao;