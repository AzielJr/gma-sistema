import React, { useState } from 'react';
import './AberturaProcesso.css';

interface ProcessoItem {
  id: number;
  numero: string;
  razaoSocial: string;
  cnpjCpf: string;
  status: string;
  dataAbertura: string;
  tecnico: string;
}

interface FormData {
  // Dados do Contribuinte
  cnpjCpf: string;
  identificador: string;
  processoAnterior: string;
  data: string;
  inscMunicipal: string;
  dnpm: string;
  razaoSocial: string;
  nomeFantasia: string;
  
  // Processo
  roteiro: string;
  validadeDias: string;
  tecnicoAmbiental: string;
  validadeRegistro: string;
  atividadePrincipal: string;
  
  // Classificação da Atividade
  codigo: string;
  secao: string;
  divisao: string;
  grupo: string;
  
  // Órgão de Referência
  cnae: boolean;
  coema: boolean;
  comam: boolean;
  urbana: boolean;
  
  // Atividade Secundária
  codigoSecundaria: string;
  secaoSecundaria: string;
  divisaoSecundaria: string;
  grupoSecundaria: string;
}

const AberturaProcesso: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dados-processo');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [processos] = useState<ProcessoItem[]>([
    {
      id: 1,
      numero: "2024/001",
      razaoSocial: "Empresa ABC Ltda",
      cnpjCpf: "12.345.678/0001-90",
      status: "Em Análise",
      dataAbertura: "15/01/2024",
      tecnico: "João Silva"
    },
    {
      id: 2,
      numero: "2024/002",
      razaoSocial: "Indústria XYZ S.A.",
      cnpjCpf: "98.765.432/0001-10",
      status: "Aprovado",
      dataAbertura: "20/01/2024",
      tecnico: "Maria Santos"
    },
    {
      id: 3,
      numero: "2024/003",
      razaoSocial: "Comércio 123 Eireli",
      cnpjCpf: "11.222.333/0001-44",
      status: "Pendente",
      dataAbertura: "25/01/2024",
      tecnico: "Pedro Oliveira"
    },
    {
      id: 4,
      numero: "2024/004",
      razaoSocial: "Serviços DEF Ltda",
      cnpjCpf: "55.666.777/0001-88",
      status: "Em Análise",
      dataAbertura: "30/01/2024",
      tecnico: "Ana Costa"
    },
    {
      id: 5,
      numero: "2024/005",
      razaoSocial: "Construtora GHI S.A.",
      cnpjCpf: "99.888.777/0001-66",
      status: "Rejeitado",
      dataAbertura: "05/02/2024",
      tecnico: "Carlos Lima"
    }
  ]);
  
  const [formData, setFormData] = useState<FormData>({
    // Dados do Contribuinte
    cnpjCpf: '',
    identificador: '',
    processoAnterior: '',
    data: '',
    inscMunicipal: '',
    dnpm: '',
    razaoSocial: '',
    nomeFantasia: '',
    
    // Processo
    roteiro: '',
    validadeDias: '',
    tecnicoAmbiental: '',
    validadeRegistro: '',
    atividadePrincipal: '',
    
    // Classificação da Atividade
    codigo: '',
    secao: '',
    divisao: '',
    grupo: '',
    
    // Órgão de Referência
    cnae: false,
    coema: false,
    comam: false,
    urbana: false,
    
    // Atividade Secundária
    codigoSecundaria: '',
    secaoSecundaria: '',
    divisaoSecundaria: '',
    grupoSecundaria: ''
  });

  const filteredProcessos = processos.filter(processo =>
    processo.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.cnpjCpf.includes(searchTerm)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você pode implementar a lógica de envio
    setShowForm(false);
    setEditingId(null);
  };

  const handleNewProcess = () => {
    setFormData({
      cnpjCpf: '',
      identificador: '',
      processoAnterior: '',
      data: '',
      inscMunicipal: '',
      dnpm: '',
      razaoSocial: '',
      nomeFantasia: '',
      roteiro: '',
      validadeDias: '',
      tecnicoAmbiental: '',
      validadeRegistro: '',
      atividadePrincipal: '',
      codigo: '',
      secao: '',
      divisao: '',
      grupo: '',
      cnae: false,
      coema: false,
      comam: false,
      urbana: false,
      codigoSecundaria: '',
      secaoSecundaria: '',
      divisaoSecundaria: '',
      grupoSecundaria: ''
    });
    setEditingId(null);
    setActiveTab('dados-processo');
    setShowForm(true);
  };

  const handleEditProcess = (processo: ProcessoItem) => {
    setFormData({
      cnpjCpf: processo.cnpjCpf,
      identificador: processo.numero,
      processoAnterior: '',
      data: processo.dataAbertura.split('/').reverse().join('-'),
      inscMunicipal: '',
      dnpm: '',
      razaoSocial: processo.razaoSocial,
      nomeFantasia: '',
      roteiro: '',
      validadeDias: '',
      tecnicoAmbiental: processo.tecnico,
      validadeRegistro: '',
      atividadePrincipal: '',
      codigo: '',
      secao: '',
      divisao: '',
      grupo: '',
      cnae: false,
      coema: false,
      comam: false,
      urbana: false,
      codigoSecundaria: '',
      secaoSecundaria: '',
      divisaoSecundaria: '',
      grupoSecundaria: ''
    });
    setEditingId(processo.id);
    setActiveTab('dados-processo');
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return '#28a745';
      case 'Em Análise': return '#ffc107';
      case 'Pendente': return '#17a2b8';
      case 'Rejeitado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (!showForm) {
    return (
      <div className="abertura-processo">
        <div className="abertura-processo-header">
          <h1>Abertura de Processo</h1>
          <p>Gerenciamento de processos ambientais</p>
        </div>

        <div className="processo-actions">
          <button 
            className="btn-new-process"
            onClick={handleNewProcess}
          >
            + Novo Processo
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por razão social, número ou CNPJ..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="processos-table-container">
          <table className="processos-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Razão Social</th>
                <th>CNPJ/CPF</th>
                <th>Status</th>
                <th>Data Abertura</th>
                <th>Técnico</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcessos.length > 0 ? (
                filteredProcessos.map((processo) => (
                  <tr key={processo.id}>
                    <td>{processo.numero}</td>
                    <td>{processo.razaoSocial}</td>
                    <td>{processo.cnpjCpf}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(processo.status) }}
                      >
                        {processo.status}
                      </span>
                    </td>
                    <td>{processo.dataAbertura}</td>
                    <td>{processo.tecnico}</td>
                    <td>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditProcess(processo)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    Nenhum processo encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="abertura-processo">
      <div className="abertura-processo-header">
        <button 
          className="btn-back"
          onClick={handleBackToList}
        >
          ← Voltar à Lista
        </button>
        <h1>{editingId ? 'Editar Processo' : 'Novo Processo'}</h1>
        <p>Cadastro de processos ambientais</p>
      </div>

      <div className="abertura-processo-tabs">
        <button 
          className={`tab-button ${activeTab === 'dados-processo' ? 'active' : ''}`}
          onClick={() => setActiveTab('dados-processo')}
        >
          Dados do Processo
        </button>
        <button 
          className={`tab-button ${activeTab === 'atividade-secundaria' ? 'active' : ''}`}
          onClick={() => setActiveTab('atividade-secundaria')}
        >
          Atividade Secundária
        </button>
      </div>

      <form onSubmit={handleSubmit} className="abertura-processo-form">
        {activeTab === 'dados-processo' && (
          <div className="tab-content">
            {/* Dados do Contribuinte */}
            <div className="form-group">
              <h3>Dados do Contribuinte</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cnpjCpf">CNPJ/CPF:</label>
                  <input
                    type="text"
                    id="cnpjCpf"
                    name="cnpjCpf"
                    value={formData.cnpjCpf}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="identificador">Identificador:</label>
                  <input
                    type="text"
                    id="identificador"
                    name="identificador"
                    value={formData.identificador}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="processoAnterior">Processo Anterior:</label>
                  <input
                    type="text"
                    id="processoAnterior"
                    name="processoAnterior"
                    value={formData.processoAnterior}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="data">Data:</label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="inscMunicipal">Insc. Municipal:</label>
                  <input
                    type="text"
                    id="inscMunicipal"
                    name="inscMunicipal"
                    value={formData.inscMunicipal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="dnpm">DNPM:</label>
                  <input
                    type="text"
                    id="dnpm"
                    name="dnpm"
                    value={formData.dnpm}
                    onChange={handleInputChange}
                  />
                </div>
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

            {/* Processo */}
            <div className="form-group">
              <h3>Processo</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="roteiro">Roteiro:</label>
                  <select
                    id="roteiro"
                    name="roteiro"
                    value={formData.roteiro}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="licenciamento-ambiental">Licenciamento Ambiental</option>
                    <option value="autorizacao-ambiental">Autorização Ambiental</option>
                    <option value="renovacao-licenca">Renovação de Licença</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="validadeDias">Validade Dias:</label>
                  <input
                    type="number"
                    id="validadeDias"
                    name="validadeDias"
                    value={formData.validadeDias}
                    onChange={handleInputChange}
                  />
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
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="validadeRegistro">Validade do Registro:</label>
                  <input
                    type="date"
                    id="validadeRegistro"
                    name="validadeRegistro"
                    value={formData.validadeRegistro}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="atividadePrincipal">Atividade Principal:</label>
                  <input
                    type="text"
                    id="atividadePrincipal"
                    name="atividadePrincipal"
                    value={formData.atividadePrincipal}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Classificação da Atividade */}
            <div className="form-group">
              <h3>Classificação da Atividade</h3>
              <div className="form-row">
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
                  <label htmlFor="cnae">CNAE</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="coema"
                    name="coema"
                    checked={formData.coema}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="coema">COEMA</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="comam"
                    name="comam"
                    checked={formData.comam}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="comam">COMAM</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="urbana"
                    name="urbana"
                    checked={formData.urbana}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="urbana">URBANA</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'atividade-secundaria' && (
          <div className="tab-content">
            {/* Atividade Secundária */}
            <div className="form-group">
              <h3>Atividade Secundária</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="codigoSecundaria">Código:</label>
                  <input
                    type="text"
                    id="codigoSecundaria"
                    name="codigoSecundaria"
                    value={formData.codigoSecundaria}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="secaoSecundaria">Seção:</label>
                  <input
                    type="text"
                    id="secaoSecundaria"
                    name="secaoSecundaria"
                    value={formData.secaoSecundaria}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="divisaoSecundaria">Divisão:</label>
                  <input
                    type="text"
                    id="divisaoSecundaria"
                    name="divisaoSecundaria"
                    value={formData.divisaoSecundaria}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grupoSecundaria">Grupo:</label>
                  <input
                    type="text"
                    id="grupoSecundaria"
                    name="grupoSecundaria"
                    value={formData.grupoSecundaria}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleBackToList}>Cancelar</button>
          <button type="submit" className="btn-submit">
            {editingId ? 'Atualizar Processo' : 'Salvar Processo'}
          </button>
        </div>
        </form>
    </div>
  );
};

export default AberturaProcesso;