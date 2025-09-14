import React, { useState } from 'react';
import './NiveisAcesso.css';

interface NivelAcesso {
  id: number;
  descricao: string;
  observacao: string;
  permissoes: {
    dashboard: boolean;
    nucleos: boolean;
    bairros: boolean;
    cidades: boolean;
    nacionalidades: boolean;
    profissoes: boolean;
    situacaoCadastral: boolean;
    situacaoFuncional: boolean;
    setoresFuncional: boolean;
    departamentos: boolean;
    grauInstrucao: boolean;
    tipoEnquadramento: boolean;
    classificacaoEnquadramento: boolean;
    orgaosReferencia: boolean;
    unidadeMedida: boolean;
    orgaoEspecialidades: boolean;
    diretrizes: boolean;
    projetos: boolean;
    documentacaoBasica: boolean;
    documentacaoTecnica: boolean;
    tipoLogradouros: boolean;
    atividadesCnae: boolean;
    instituicoesFormacao: boolean;
    tiposDocumentos: boolean;
    statusProcesso: boolean;
    prazosValidacao: boolean;
    tiposLicenca: boolean;
    pareamentoLeis: boolean;
    grauPoluidor: boolean;
    areaEmpreendimento: boolean;
    investimentoUfm: boolean;
    textoPadrao: boolean;
    quadroFuncional: boolean;
    faixaLicenciamento: boolean;
    indexadores: boolean;
    contribuintes: boolean;
    roteiroOrientativo: boolean;
    tecnicosAmbientais: boolean;
    atividadeSecundaria: boolean;
    aberturaProcesso: boolean;
    protocoloPadrao: boolean;
    enquadramento: boolean;
    dam: boolean;
    consultaRoteiro: boolean;
    consultaProcessos: boolean;
    impressaoProcesso: boolean;
    impressaoLicenca: boolean;
    dadosOrgao: boolean;
    usuarios: boolean;
    niveisAcesso: boolean;
  };
}

const NiveisAcesso: React.FC = () => {
  const [niveisAcesso] = useState<NivelAcesso[]>([
    {
      id: 1,
      descricao: 'Administrador',
      observacao: 'Acesso total ao sistema com todas as permissões habilitadas.',
      permissoes: {
        dashboard: true,
        nucleos: true,
        bairros: true,
        cidades: true,
        nacionalidades: true,
        profissoes: true,
        situacaoCadastral: true,
        situacaoFuncional: true,
        setoresFuncional: true,
        departamentos: true,
        grauInstrucao: true,
        tipoEnquadramento: true,
        classificacaoEnquadramento: true,
        orgaosReferencia: true,
        unidadeMedida: true,
        orgaoEspecialidades: true,
        diretrizes: true,
        projetos: true,
        documentacaoBasica: true,
        documentacaoTecnica: true,
        tipoLogradouros: true,
        atividadesCnae: true,
        instituicoesFormacao: true,
        tiposDocumentos: true,
        statusProcesso: true,
        prazosValidacao: true,
        tiposLicenca: true,
        pareamentoLeis: true,
        grauPoluidor: true,
        areaEmpreendimento: true,
        investimentoUfm: true,
        textoPadrao: true,
        quadroFuncional: true,
        faixaLicenciamento: true,
        indexadores: true,
        contribuintes: true,
        roteiroOrientativo: true,
        tecnicosAmbientais: true,
        atividadeSecundaria: true,
        aberturaProcesso: true,
        protocoloPadrao: true,
        enquadramento: true,
        dam: true,
        consultaRoteiro: true,
        consultaProcessos: true,
        impressaoProcesso: true,
        impressaoLicenca: true,
        dadosOrgao: true,
        usuarios: true,
        niveisAcesso: true
      }
    },
    {
      id: 2,
      descricao: 'Operador',
      observacao: 'Acesso limitado apenas às funcionalidades básicas do sistema.',
      permissoes: {
        dashboard: true,
        nucleos: false,
        bairros: false,
        cidades: false,
        nacionalidades: false,
        profissoes: false,
        situacaoCadastral: false,
        situacaoFuncional: false,
        setoresFuncional: false,
        departamentos: false,
        grauInstrucao: false,
        tipoEnquadramento: false,
        classificacaoEnquadramento: false,
        orgaosReferencia: false,
        unidadeMedida: false,
        orgaoEspecialidades: false,
        diretrizes: false,
        projetos: false,
        documentacaoBasica: false,
        documentacaoTecnica: false,
        tipoLogradouros: false,
        atividadesCnae: false,
        instituicoesFormacao: false,
        tiposDocumentos: false,
        statusProcesso: false,
        prazosValidacao: false,
        tiposLicenca: false,
        pareamentoLeis: false,
        grauPoluidor: false,
        areaEmpreendimento: false,
        investimentoUfm: false,
        textoPadrao: false,
        quadroFuncional: false,
        faixaLicenciamento: false,
        indexadores: false,
        contribuintes: true,
        roteiroOrientativo: true,
        tecnicosAmbientais: false,
        atividadeSecundaria: false,
        aberturaProcesso: true,
        protocoloPadrao: true,
        enquadramento: true,
        dam: false,
        consultaRoteiro: true,
        consultaProcessos: true,
        impressaoProcesso: false,
        impressaoLicenca: false,
        dadosOrgao: false,
        usuarios: false,
        niveisAcesso: false
      }
    },
    {
      id: 3,
      descricao: 'Consulta',
      observacao: 'Acesso somente para consultas, sem permissões de edição.',
      permissoes: {
        dashboard: true,
        nucleos: false,
        bairros: false,
        cidades: false,
        nacionalidades: false,
        profissoes: false,
        situacaoCadastral: false,
        situacaoFuncional: false,
        setoresFuncional: false,
        departamentos: false,
        grauInstrucao: false,
        tipoEnquadramento: false,
        classificacaoEnquadramento: false,
        orgaosReferencia: false,
        unidadeMedida: false,
        orgaoEspecialidades: false,
        diretrizes: false,
        projetos: false,
        documentacaoBasica: false,
        documentacaoTecnica: false,
        tipoLogradouros: false,
        atividadesCnae: false,
        instituicoesFormacao: false,
        tiposDocumentos: false,
        statusProcesso: false,
        prazosValidacao: false,
        tiposLicenca: false,
        pareamentoLeis: false,
        grauPoluidor: false,
        areaEmpreendimento: false,
        investimentoUfm: false,
        textoPadrao: false,
        quadroFuncional: false,
        faixaLicenciamento: false,
        indexadores: false,
        contribuintes: false,
        roteiroOrientativo: true,
        tecnicosAmbientais: false,
        atividadeSecundaria: false,
        aberturaProcesso: false,
        protocoloPadrao: false,
        enquadramento: false,
        dam: false,
        consultaRoteiro: true,
        consultaProcessos: true,
        impressaoProcesso: false,
        impressaoLicenca: false,
        dadosOrgao: false,
        usuarios: false,
        niveisAcesso: false
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedNivel, setSelectedNivel] = useState<NivelAcesso | null>(null);
  const [formData, setFormData] = useState<Partial<NivelAcesso>>({
    id: 0,
    descricao: '',
    observacao: '',
    permissoes: {
      dashboard: false,
      nucleos: false,
      bairros: false,
      cidades: false,
      nacionalidades: false,
      profissoes: false,
      situacaoCadastral: false,
      situacaoFuncional: false,
      setoresFuncional: false,
      departamentos: false,
      grauInstrucao: false,
      tipoEnquadramento: false,
      classificacaoEnquadramento: false,
      orgaosReferencia: false,
      unidadeMedida: false,
      orgaoEspecialidades: false,
      diretrizes: false,
      projetos: false,
      documentacaoBasica: false,
      documentacaoTecnica: false,
      tipoLogradouros: false,
      atividadesCnae: false,
      instituicoesFormacao: false,
      tiposDocumentos: false,
      statusProcesso: false,
      prazosValidacao: false,
      tiposLicenca: false,
      pareamentoLeis: false,
      grauPoluidor: false,
      areaEmpreendimento: false,
      investimentoUfm: false,
      textoPadrao: false,
      quadroFuncional: false,
      faixaLicenciamento: false,
      indexadores: false,
      contribuintes: false,
      roteiroOrientativo: false,
      tecnicosAmbientais: false,
      atividadeSecundaria: false,
      aberturaProcesso: false,
      protocoloPadrao: false,
      enquadramento: false,
      dam: false,
      consultaRoteiro: false,
      consultaProcessos: false,
      impressaoProcesso: false,
      impressaoLicenca: false,
      dadosOrgao: false,
      usuarios: false,
      niveisAcesso: false
    }
  });

  const filteredNiveis = niveisAcesso.filter(nivel =>
    nivel.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissoes: {
        ...prev.permissoes!,
        [permission]: checked
      }
    }));
  };

  const handleEdit = (nivel: NivelAcesso) => {
    setSelectedNivel(nivel);
    setFormData(nivel);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este nível de acesso?')) {
      console.log('Excluindo nível:', id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Nível de acesso salvo com sucesso!');
    setShowForm(false);
    setSelectedNivel(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedNivel(null);
    setFormData({
      id: 0,
      descricao: '',
      observacao: '',
      permissoes: {
        dashboard: false,
        nucleos: false,
        bairros: false,
        cidades: false,
        nacionalidades: false,
        profissoes: false,
        situacaoCadastral: false,
        situacaoFuncional: false,
        setoresFuncional: false,
        departamentos: false,
        grauInstrucao: false,
        tipoEnquadramento: false,
        classificacaoEnquadramento: false,
        orgaosReferencia: false,
        unidadeMedida: false,
        orgaoEspecialidades: false,
        diretrizes: false,
        projetos: false,
        documentacaoBasica: false,
        documentacaoTecnica: false,
        tipoLogradouros: false,
        atividadesCnae: false,
        instituicoesFormacao: false,
        tiposDocumentos: false,
        statusProcesso: false,
        prazosValidacao: false,
        tiposLicenca: false,
        pareamentoLeis: false,
        grauPoluidor: false,
        areaEmpreendimento: false,
        investimentoUfm: false,
        textoPadrao: false,
        quadroFuncional: false,
        faixaLicenciamento: false,
        indexadores: false,
        contribuintes: false,
        roteiroOrientativo: false,
        tecnicosAmbientais: false,
        atividadeSecundaria: false,
        aberturaProcesso: false,
        protocoloPadrao: false,
        enquadramento: false,
        dam: false,
        consultaRoteiro: false,
        consultaProcessos: false,
        impressaoProcesso: false,
        impressaoLicenca: false,
        dadosOrgao: false,
        usuarios: false,
        niveisAcesso: false
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuPermissions = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'nucleos', label: 'Núcleos' },
    { key: 'bairros', label: 'Bairros' },
    { key: 'cidades', label: 'Cidades' },
    { key: 'nacionalidades', label: 'Nacionalidades' },
    { key: 'profissoes', label: 'Profissões' },
    { key: 'situacaoCadastral', label: 'Situação Cadastral' },
    { key: 'situacaoFuncional', label: 'Situação Funcional' },
    { key: 'setoresFuncional', label: 'Setores Funcional' },
    { key: 'departamentos', label: 'Departamentos' },
    { key: 'grauInstrucao', label: 'Grau de Instrução' },
    { key: 'tipoEnquadramento', label: 'Tipo de Enquadramento' },
    { key: 'classificacaoEnquadramento', label: 'Classificação de Enquadramento' },
    { key: 'orgaosReferencia', label: 'Órgãos de Referência' },
    { key: 'unidadeMedida', label: 'Unidade de Medida' },
    { key: 'orgaoEspecialidades', label: 'Órgão de Especialidades' },
    { key: 'diretrizes', label: 'Diretrizes' },
    { key: 'projetos', label: 'Projetos' },
    { key: 'documentacaoBasica', label: 'Documentação Básica' },
    { key: 'documentacaoTecnica', label: 'Documentação Técnica' },
    { key: 'tipoLogradouros', label: 'Tipo de Logradouros' },
    { key: 'atividadesCnae', label: 'Atividades CNAE' },
    { key: 'instituicoesFormacao', label: 'Instituições de Formação' },
    { key: 'tiposDocumentos', label: 'Tipos de Documentos' },
    { key: 'statusProcesso', label: 'Status de Processo' },
    { key: 'prazosValidacao', label: 'Prazos de Validação' },
    { key: 'tiposLicenca', label: 'Tipos de Licença' },
    { key: 'pareamentoLeis', label: 'Pareamento das Leis' },
    { key: 'grauPoluidor', label: 'Grau Poluidor' },
    { key: 'areaEmpreendimento', label: 'Área do Empreendimento' },
    { key: 'investimentoUfm', label: 'Investimento em UFM' },
    { key: 'textoPadrao', label: 'Texto Padrão' },
    { key: 'quadroFuncional', label: 'Quadro Funcional' },
    { key: 'faixaLicenciamento', label: 'Faixa de Licenciamento Municipal' },
    { key: 'indexadores', label: 'Indexadores' },
    { key: 'contribuintes', label: 'Contribuintes' },
    { key: 'roteiroOrientativo', label: 'Roteiro Orientativo' },
    { key: 'tecnicosAmbientais', label: 'Técnicos Ambientais' },
    { key: 'atividadeSecundaria', label: 'Atividade Secundária' },
    { key: 'aberturaProcesso', label: 'Abertura de Processo' },
    { key: 'protocoloPadrao', label: 'Protocolo Padrão' },
    { key: 'enquadramento', label: 'Enquadramento' },
    { key: 'dam', label: 'DAM' },
    { key: 'consultaRoteiro', label: 'Consulta Roteiro Orientativo' },
    { key: 'consultaProcessos', label: 'Consulta Processos' },
    { key: 'impressaoProcesso', label: 'Impressão Processo' },
    { key: 'impressaoLicenca', label: 'Impressão Licença' },
    { key: 'dadosOrgao', label: 'Dados do Órgão' },
    { key: 'usuarios', label: 'Usuários' },
    { key: 'niveisAcesso', label: 'Níveis de Acesso' }
  ];
  
  const menuPermissionsHierarchy = [
    {
      category: 'Dashboard',
      items: [
        { key: 'dashboard', label: 'Dashboard' }
      ]
    },
    {
      category: 'Cadastros',
      items: [
        {
          subcategory: 'Tabelas de Referência',
          items: [
            { key: 'nucleos', label: 'Núcleos' },
            { key: 'bairros', label: 'Bairros' },
            { key: 'cidades', label: 'Cidades' },
            { key: 'nacionalidades', label: 'Nacionalidades' },
            { key: 'profissoes', label: 'Profissões' },
            { key: 'situacaoCadastral', label: 'Situação Cadastral' },
            { key: 'situacaoFuncional', label: 'Situação Funcional' },
            { key: 'setoresFuncional', label: 'Setores Funcional' },
            { key: 'departamentos', label: 'Departamentos' },
            { key: 'grauInstrucao', label: 'Grau de Instrução' },
            { key: 'tipoEnquadramento', label: 'Tipo de Enquadramento' },
            { key: 'classificacaoEnquadramento', label: 'Classificação de Enquadramento' },
            { key: 'orgaosReferencia', label: 'Órgãos de Referência' },
            { key: 'unidadeMedida', label: 'Unidade de Medida' },
            { key: 'orgaoEspecialidades', label: 'Órgão de Especialidades' },
            { key: 'diretrizes', label: 'Diretrizes' },
            { key: 'projetos', label: 'Projetos' },
            { key: 'documentacaoBasica', label: 'Documentação Básica' },
            { key: 'documentacaoTecnica', label: 'Documentação Técnica' },
            { key: 'tipoLogradouros', label: 'Tipo de Logradouros' },
            { key: 'atividadesCnae', label: 'Atividades CNAE' },
            { key: 'instituicoesFormacao', label: 'Instituições de Formação' },
            { key: 'tiposDocumentos', label: 'Tipos de Documentos' },
            { key: 'statusProcesso', label: 'Status de Processo' },
            { key: 'prazosValidacao', label: 'Prazos de Validação' },
            { key: 'tiposLicenca', label: 'Tipos de Licença' },
            { key: 'pareamentoLeis', label: 'Pareamento das Leis' },
            { key: 'grauPoluidor', label: 'Grau Poluidor' },
            { key: 'areaEmpreendimento', label: 'Área do Empreendimento' },
            { key: 'investimentoUfm', label: 'Investimento em UFM' },
            { key: 'textoPadrao', label: 'Texto Padrão' },
            { key: 'quadroFuncional', label: 'Quadro Funcional' },
            { key: 'faixaLicenciamento', label: 'Faixa de Licenciamento Municipal' }
          ]
        }
      ]
    },
    {
      category: 'Indexadores',
      items: [
        { key: 'indexadores', label: 'Indexadores' }
      ]
    },
    {
      category: 'Contribuintes',
      items: [
        { key: 'contribuintes', label: 'Contribuintes' }
      ]
    },
    {
      category: 'Trâmite',
      items: [
        { key: 'aberturaProcesso', label: 'Abertura de Processo' },
        { key: 'protocoloPadrao', label: 'Protocolo Padrão' },
        { key: 'enquadramento', label: 'Enquadramento' },
        { key: 'dam', label: 'DAM' }
      ]
    },
    {
      category: 'Consultas',
      items: [
        { key: 'roteiroOrientativo', label: 'Roteiro Orientativo' },
        { key: 'tecnicosAmbientais', label: 'Técnicos Ambientais' },
        { key: 'atividadeSecundaria', label: 'Atividade Secundária' },
        { key: 'consultaRoteiro', label: 'Consulta Roteiro Orientativo' },
        { key: 'consultaProcessos', label: 'Consulta Processos' }
      ]
    },
    {
      category: 'Impressões',
      items: [
        { key: 'impressaoProcesso', label: 'Impressão Processo' },
        { key: 'impressaoLicenca', label: 'Impressão Licença' }
      ]
    },
    {
      category: 'Utilidades',
      items: [
        { key: 'dadosOrgao', label: 'Dados do Órgão' },
        { key: 'usuarios', label: 'Usuários' },
        { key: 'niveisAcesso', label: 'Níveis de Acesso' }
      ]
    }
  ];

  if (showForm) {
    return (
      <div className="niveis-acesso-container">
        <div className="form-header">
          <button 
            className="back-button"
            onClick={handleCancel}
          >
            ← Voltar
          </button>
          <h2>{selectedNivel ? 'Editar Nível de Acesso' : 'Cadastrar Nível de Acesso'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="nivel-form">
          <div className="form-section">
            <h3>Dados Básicos</h3>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="descricao">Descrição:</label>
                <input 
                  type="text" 
                  id="descricao"
                  name="descricao"
                  value={formData.descricao || ''}
                  onChange={handleInputChange}
                  className="form-control" 
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="observacao">Observação:</label>
                <textarea 
                  id="observacao"
                  name="observacao"
                  value={formData.observacao || ''}
                  onChange={handleInputChange}
                  className="form-control" 
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Permissões de Acesso</h3>
            <div className="permissions-hierarchy">
              {menuPermissionsHierarchy.map(category => (
                <div key={category.category} className="permission-category">
                  <div className="category-header">{category.category}</div>
                  <div className="category-items">
                    {category.items.map(item => {
                      if (item.subcategory) {
                        return (
                          <div key={item.subcategory} className="subcategory">
                            <div className="category-header">{item.subcategory}</div>
                            <div className="category-items">
                              {item.items.map(subItem => (
                                <div key={subItem.key} className="permission-item">
                                  <input
                                    type="checkbox"
                                    id={subItem.key}
                                    checked={formData.permissoes?.[subItem.key] || false}
                                    onChange={(e) => handlePermissionChange(subItem.key, e.target.checked)}
                                  />
                                  <label htmlFor={subItem.key}>{subItem.label}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={item.key} className="permission-item">
                            <input
                              type="checkbox"
                              id={item.key}
                              checked={formData.permissoes?.[item.key] || false}
                              onChange={(e) => handlePermissionChange(item.key, e.target.checked)}
                            />
                            <label htmlFor={item.key}>{item.label}</label>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {selectedNivel ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="niveis-acesso-container">
      <div className="page-header">
        <h2>Níveis de Acesso</h2>
      </div>

      <div className="niveis-content-wrapper">
        <div className="list-section">
          <div className="list-header">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar por descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="btn-add"
              onClick={() => setShowForm(true)}
            >
              Cadastrar
            </button>
          </div>

          <div className="table-container">
            <table className="niveis-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Observação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredNiveis.map(nivel => (
                  <tr key={nivel.id}>
                    <td>
                      <div className="nivel-info">
                        <strong>{nivel.descricao}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="observacao-cell">
                        {nivel.observacao}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(nivel)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDelete(nivel.id)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NiveisAcesso;