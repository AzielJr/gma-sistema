import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const TextoPadrao = () => {
  const [textosPadrao, setTextosPadrao] = useState([]);
  const [filteredTextosPadrao, setFilteredTextosPadrao] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTextoPadrao, setEditingTextoPadrao] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    categoria: '',
    ativo: true
  });

  // Dados mockados
  const mockTextosPadrao = [
    { 
      id: 1, 
      titulo: 'Parecer Técnico Favorável', 
      conteudo: 'Com base na análise técnica realizada, considerando os aspectos ambientais e legais pertinentes, emito parecer FAVORÁVEL ao licenciamento da atividade em questão.', 
      categoria: 'Parecer',
      ativo: true 
    },
    { 
      id: 2, 
      titulo: 'Condicionantes Ambientais', 
      conteudo: 'O empreendimento deverá cumprir as seguintes condicionantes: 1) Implementar sistema de tratamento de efluentes; 2) Realizar monitoramento da qualidade do ar; 3) Apresentar relatórios semestrais.', 
      categoria: 'Condicionante',
      ativo: true 
    },
    { 
      id: 3, 
      titulo: 'Notificação de Pendência', 
      conteudo: 'Informamos que o processo apresenta pendências documentais que devem ser sanadas no prazo de 30 dias, sob pena de arquivamento.', 
      categoria: 'Notificação',
      ativo: true 
    },
    { 
      id: 4, 
      titulo: 'Termo de Compromisso', 
      conteudo: 'O requerente compromete-se a cumprir todas as exigências legais e técnicas estabelecidas neste licenciamento ambiental.', 
      categoria: 'Termo',
      ativo: false 
    },
    { 
      id: 5, 
      titulo: 'Vistoria Técnica', 
      conteudo: 'Foi realizada vistoria técnica no empreendimento em [DATA], constatando-se conformidade com as especificações do projeto apresentado.', 
      categoria: 'Vistoria',
      ativo: true 
    }
  ];

  useEffect(() => {
    setTextosPadrao(mockTextosPadrao);
    setFilteredTextosPadrao(mockTextosPadrao);
  }, []);

  useEffect(() => {
    const filtered = textosPadrao.filter(texto =>
      texto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      texto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      texto.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTextosPadrao(filtered);
  }, [searchTerm, textosPadrao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTextoPadrao) {
      setTextosPadrao(prev => prev.map(texto => 
        texto.id === editingTextoPadrao.id 
          ? { ...texto, ...formData }
          : texto
      ));
    } else {
      const newTextoPadrao = {
        id: Math.max(...textosPadrao.map(t => t.id)) + 1,
        ...formData
      };
      setTextosPadrao(prev => [...prev, newTextoPadrao]);
    }
    
    resetForm();
  };

  const handleEdit = (textoPadrao) => {
    setEditingTextoPadrao(textoPadrao);
    setFormData({
      titulo: textoPadrao.titulo,
      conteudo: textoPadrao.conteudo,
      categoria: textoPadrao.categoria,
      ativo: textoPadrao.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este texto padrão?')) {
      setTextosPadrao(prev => prev.filter(texto => texto.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      conteudo: '',
      categoria: '',
      ativo: true
    });
    setEditingTextoPadrao(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setTextosPadrao(prev => prev.map(texto => 
      texto.id === id 
        ? { ...texto, ativo: !texto.ativo }
        : texto
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Texto Padrão</h1>
          <p>Gerenciamento de textos padrão para documentos e comunicações</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Texto
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingTextoPadrao ? 'Editar Texto Padrão' : 'Cadastrar Texto Padrão'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-group">
                <label htmlFor="titulo">Título *</label>
                <input
                  type="text"
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  required
                  maxLength={200}
                  placeholder="Digite o título do texto padrão"
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoria *</label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Licenciamento">Licenciamento</option>
                  <option value="Fiscalização">Fiscalização</option>
                  <option value="Comunicação">Comunicação</option>
                  <option value="Documentação">Documentação</option>
                  <option value="Notificação">Notificação</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="conteudo">Conteúdo *</label>
                <textarea
                  id="conteudo"
                  value={formData.conteudo}
                  onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                  required
                  rows={8}
                  maxLength={5000}
                  placeholder="Digite o conteúdo do texto padrão"
                />
              </div>

              <div className="form-group">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  rows={3}
                  maxLength={500}
                  placeholder="Digite observações sobre o uso do texto"
                />
              </div>

              <div className="form-group">
                <Toggle
                  id="ativo"
                  label="Status:"
                  checked={formData.ativo}
                  onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingTextoPadrao ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <div className="table-controls">
          <div className="search-container">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar textos padrão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredTextosPadrao.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Conteúdo</th>
                <th>Observações</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTextosPadrao.map(texto => (
                <tr key={texto.id}>
                  <td>{texto.id}</td>
                  <td className="contexto-cell">{texto.titulo}</td>
                  <td>
                    <span className="classificacao-badge">{texto.categoria}</span>
                  </td>
                  <td className="contexto-cell">
                    {texto.conteudo.length > 100 
                      ? `${texto.conteudo.substring(0, 100)}...` 
                      : texto.conteudo
                    }
                  </td>
                  <td className="contexto-cell">{texto.observacoes}</td>
                  <td>
                    <Toggle
                      checked={texto.ativo}
                      onChange={() => handleToggleStatus(texto.id)}
                      id={`toggle-${texto.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(texto)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(texto.id)}
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTextosPadrao.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhum texto padrão encontrado</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre um novo texto padrão.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextoPadrao;