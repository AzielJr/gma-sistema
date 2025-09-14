import React from 'react';
import './MainContent.css';

// Importando os componentes das Tabelas de Referência
import Nucleos from '../TabelasReferencia/Nucleos/Nucleos';
import Bairros from '../TabelasReferencia/Bairros/Bairros';
import UnidadeMedida from '../TabelasReferencia/UnidadeMedida/UnidadeMedida';
import Cidades from '../TabelasReferencia/Cidades/Cidades';
import Nacionalidades from '../TabelasReferencia/Nacionalidades/Nacionalidades';
import Diretrizes from '../TabelasReferencia/Diretrizes/Diretrizes';
import AtividadesCNAE from '../TabelasReferencia/AtividadesCNAE/AtividadesCNAE';
import PareamentoLeis from '../TabelasReferencia/PareamentoLeis/PareamentoLeis';
import Profissoes from '../TabelasReferencia/Profissoes/Profissoes';
import Projetos from '../TabelasReferencia/Projetos/Projetos';
import TiposLicenca from '../TabelasReferencia/TiposLicenca/TiposLicenca';
import GrauPoluidor from '../TabelasReferencia/GrauPoluidor/GrauPoluidor';
import TextoPadrao from '../TabelasReferencia/TextoPadrao/TextoPadrao';
import SituacaoCadastral from '../TabelasReferencia/SituacaoCadastral/SituacaoCadastral';
import SituacaoFuncional from '../TabelasReferencia/SituacaoFuncional/SituacaoFuncional';
import SetoresFuncional from '../TabelasReferencia/SetoresFuncional/SetoresFuncional';
import GrauInstrucao from '../TabelasReferencia/GrauInstrucao/GrauInstrucao';
import TipoEnquadramento from '../TabelasReferencia/TipoEnquadramento/TipoEnquadramento';
import ClassificacaoEnquadramento from '../TabelasReferencia/ClassificacaoEnquadramento/ClassificacaoEnquadramento';
import OrgaosReferencia from '../TabelasReferencia/OrgaosReferencia/OrgaosReferencia';
import OrgaoEspecialidades from '../TabelasReferencia/OrgaoEspecialidades/OrgaoEspecialidades';
import QuadroFuncional from '../TabelasReferencia/QuadroFuncional/QuadroFuncional';
import Departamentos from '../TabelasReferencia/Departamentos/Departamentos';
import DocumentacaoBasica from '../TabelasReferencia/DocumentacaoBasica/DocumentacaoBasica';
import DocumentacaoTecnica from '../TabelasReferencia/DocumentacaoTecnica/DocumentacaoTecnica';
import TipoLogradouros from '../TabelasReferencia/TipoLogradouros/TipoLogradouros';
import InstituicoesFormacao from '../TabelasReferencia/InstituicoesFormacao/InstituicoesFormacao';
import TiposDocumentos from '../TabelasReferencia/TiposDocumentos/TiposDocumentos';
import StatusProcesso from '../TabelasReferencia/StatusProcesso/StatusProcesso';
import PrazosValidacao from '../TabelasReferencia/PrazosValidacao/PrazosValidacao';
import InvestimentoUFM from '../TabelasReferencia/InvestimentoUFM/InvestimentoUFM';
import FaixaLicenciamento from '../TabelasReferencia/FaixaLicenciamento/FaixaLicenciamento';
import Indexadores from '../TabelasReferencia/Indexadores/Indexadores';
import AreaEmpreendimento from '../TabelasReferencia/AreaEmpreendimento/AreaEmpreendimento';
import Contribuintes from '../TabelasReferencia/Contribuintes/Contribuintes';
import RoteiroOrientativo from '../TabelasReferencia/RoteiroOrientativo/RoteiroOrientativo';
import TecnicosAmbientais from '../TabelasReferencia/TecnicosAmbientais/TecnicosAmbientais';
import AtividadeSecundaria from '../TabelasReferencia/AtividadeSecundaria/AtividadeSecundaria';
import ProtocoloPadrao from '../ProtocoloPadrao/ProtocoloPadrao.tsx';
import AberturaProcesso from '../AberturaProcesso/AberturaProcesso.tsx';
import Enquadramento from '../Enquadramento/Enquadramento.tsx';
import DadosOrgao from '../DadosOrgao/DadosOrgao.tsx';
import Usuarios from '../Usuarios/Usuarios.tsx';
import NiveisAcesso from '../NiveisAcesso/NiveisAcesso.tsx';

const MainContent = ({ activeModule, sidebarOpen }) => {
  console.log('Módulo ativo:', activeModule); // Adicione esta linha temporariamente
  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="dashboard-home">
            <div className="welcome-section">
              <h1>Bem-vindo ao GMA</h1>
              <p>Sistema de Gestão em Meio Ambiente - Controle Total e Eficiente</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>Licenças Ativas</h3>
                <div className="number">247</div>
                <div className="label">Total de licenças em vigor</div>
              </div>
              <div className="stat-card">
                <h3>Processos em Andamento</h3>
                <div className="number">89</div>
                <div className="label">Aguardando análise técnica</div>
              </div>
              <div className="stat-card">
                <h3>Contribuintes Ativos</h3>
                <div className="number">1,234</div>
                <div className="label">Cadastros validados</div>
              </div>
              <div className="stat-card">
                <h3>Vencimentos Próximos</h3>
                <div className="number">15</div>
                <div className="label">Próximos 30 dias</div>
              </div>
            </div>

            <div className="quick-actions-section">
              <h2 className="section-title">Ações Rápidas</h2>
              <div className="quick-actions">
                <div className="action-card">
                  <div className="icon">📝</div>
                  <h3>Nova Licença</h3>
                  <p>Iniciar processo de licenciamento ambiental</p>
                </div>
                <div className="action-card">
                  <div className="icon">👥</div>
                  <h3>Cadastrar Contribuinte</h3>
                  <p>Adicionar novo contribuinte ao sistema</p>
                </div>
                <div className="action-card">
                  <div className="icon">📊</div>
                  <h3>Relatórios</h3>
                  <p>Gerar relatórios e estatísticas</p>
                </div>
                <div className="action-card">
                  <div className="icon">🔍</div>
                  <h3>Consultar Processo</h3>
                  <p>Buscar e acompanhar processos</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'logout':
        return (
          <div className="logout-content">
            <h2>Saindo do sistema...</h2>
            <p>Você será redirecionado para a tela de login.</p>
          </div>
        );
      
      // Rotas das Tabelas de Referência
      case 'nucleos':
        return <Nucleos />;
      
      case 'bairros':
        return <Bairros />;
      
      case 'cidades':
        return <Cidades />;
      
      case 'nacionalidades':
        return <Nacionalidades />;
      
      case 'unidade-medida':
        return <UnidadeMedida />;
      
      case 'diretrizes':
        return <Diretrizes />;
      
      case 'atividades-cnae':
        return <AtividadesCNAE />;
      
      case 'pareamento-leis':
        return <PareamentoLeis />;
      
      case 'profissoes':
        return <Profissoes />;
      
      case 'projetos':
        return <Projetos />;
      
      case 'tipos-licenca':
        return <TiposLicenca />;
      
      case 'grau-poluidor':
        return <GrauPoluidor />;
      
      case 'texto-padrao':
        return <TextoPadrao />;
      
      case 'situacao-cadastral':
        return <SituacaoCadastral />;
      
      case 'situacao-funcional':
        return <SituacaoFuncional />;
      
      case 'setores-funcional':
        return <SetoresFuncional />;
      
      case 'grau-instrucao':
        return <GrauInstrucao />;
      
      case 'tipo-enquadramento':
        return <TipoEnquadramento />;
      
      case 'classificacao-enquadramento':
        return <ClassificacaoEnquadramento />;
      
      case 'orgaos-referencia':
        return <OrgaosReferencia />;
      
      case 'orgao-especialidades':
        return <OrgaoEspecialidades />;
      
      case 'quadro-funcional':
        return <QuadroFuncional />;
      
      case 'departamentos':
        return <Departamentos />;
      
      case 'documentacao-basica':
        return <DocumentacaoBasica />;
      
      case 'documentacao-tecnica':
        return <DocumentacaoTecnica />;
      
      case 'tipo-logradouros':
        return <TipoLogradouros />;
      
      case 'instituicoes-formacao':
        return <InstituicoesFormacao />;
      
      case 'tipos-documentos':
        return <TiposDocumentos />;
      
      case 'status-processo':
        return <StatusProcesso />;
      
      case 'prazos-validacao':
        return <PrazosValidacao />;
      
      case 'investimento-ufm':
        return <InvestimentoUFM />;
      
      case 'faixa-licenciamento':
        return <FaixaLicenciamento />;
      
      case 'indexadores':
        return <Indexadores />;
      case 'contribuintes':
        return <Contribuintes />;
      case 'roteiro-orientativo':
        return <RoteiroOrientativo />;
      case 'tecnicos-ambientais':
        return <TecnicosAmbientais />;
      case 'atividade-secundaria':
        return <AtividadeSecundaria />;
      case 'area-empreendimento':
        return <AreaEmpreendimento />;
      
      case 'protocolo-padrao':
        return <ProtocoloPadrao />;
      
      case 'abertura-processo':
        return <AberturaProcesso />;
      
      case 'enquadramento':
        return <Enquadramento />;
      
      case 'dados-orgao':
        return <DadosOrgao />;
      
      case 'usuarios':
        return <Usuarios />;
      
      case 'niveis-acesso':
        return <NiveisAcesso />;
      
      default:
        return (
          <div className="module-content">
            <div className="module-header">
              <h1>{getModuleTitle(activeModule)}</h1>
              <p>Módulo em desenvolvimento</p>
            </div>
            
            <div className="module-placeholder">
              <div className="placeholder-icon">🚧</div>
              <h3>Módulo em Construção</h3>
              <p>Este módulo está sendo desenvolvido e estará disponível em breve.</p>
              <div className="module-info">
                <strong>Módulo selecionado:</strong> {getModuleTitle(activeModule)}
              </div>
            </div>
          </div>
        );
    }
  };

  const getModuleTitle = (module) => {
    const titles = {
      'nucleos': 'Núcleos',
      'bairros': 'Bairros',
      'cidades': 'Cidades',
      'nacionalidades': 'Nacionalidades',
      'profissoes': 'Profissões',
      'situacao-cadastral': 'Situação Cadastral',
      'situacao-funcional': 'Situação Funcional',
      'setores-funcional': 'Setores Funcional',
      'departamentos': 'Departamentos',
      'grau-instrucao': 'Grau de Instrução',
      'tipo-enquadramento': 'Tipo de Enquadramento',
      'classificacao-enquadramento': 'Classificação de Enquadramento',
      'orgaos-referencia': 'Órgãos de Referência',
      'unidade-medida': 'Unidade de Medida',
      'orgao-especialidades': 'Órgão de Especialidades',
      'diretrizes': 'Diretrizes',
      'projetos': 'Projetos',
      'documentacao-basica': 'Documentação Básica',
      'documentacao-tecnica': 'Documentação Técnica',
      'tipo-logradouros': 'Tipo de Logradouros',
      'atividades-cnae': 'Atividades CNAE',
      'instituicoes-formacao': 'Instituições de Formação',
      'tipos-documentos': 'Tipos de Documentos',
      'status-processo': 'Status de Processo',
      'prazos-validacao': 'Prazos de Validação',
      'tipos-licenca': 'Tipos de Licença',
      'pareamento-leis': 'Pareamento das Leis',
      'grau-poluidor': 'Grau Poluidor',
      'area-empreendimento': 'Área do Empreendimento',
      'investimento-ufm': 'Investimento em UFM',
      'texto-padrao': 'Texto Padrão',
      'quadro-funcional': 'Quadro Funcional',
      'faixa-licenciamento': 'Faixa de Licenciamento Municipal',
      'indexadores': 'Indexadores',
      'contribuintes': 'Contribuintes',
      'roteiro-orientativo': 'Roteiro Orientativo',
      'tecnicos-ambientais': 'Técnicos Ambientais',
      'atividade-secundaria': 'Atividade Secundária',
      'abertura-processo': 'Abertura de Processo',
      'protocolo-padrao': 'Protocolo Padrão',
      'protocolo-livre': 'Protocolo Livre',
      'enquadramento': 'Enquadramento',
      'dam': 'DAM',
      'consulta-roteiro': 'Consulta Roteiro Orientativo',
      'consulta-processos': 'Consulta Processos',
      'impressao-processo': 'Impressão de Processo',
      'impressao-licenca': 'Impressão de Licença',
      'preferencias': 'Preferências',
      'usuarios': 'Usuários',
      'niveis-acesso': 'Níveis de Acesso',
      'dados-orgao': 'Dados do Órgão'
    };
    
    return titles[module] || module.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;