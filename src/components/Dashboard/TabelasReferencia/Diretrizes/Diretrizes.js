import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const Diretrizes = () => {
  const [diretrizes, setDiretrizes] = useState([]);
  const [filteredDiretrizes, setFilteredDiretrizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDiretriz, setEditingDiretriz] = useState(null);
  const [formData, setFormData] = useState({
    prazo: '',
    contexto: '',
    ativo: true
  });

  // Dados mockados
  const mockDiretrizes = [
    { id: 1, prazo: 30, contexto: 'Análise de impacto ambiental', ativo: true },
    { id: 2, prazo: 15, contexto: 'Licenciamento simplificado', ativo: true },
    { id: 3, prazo: 60, contexto: 'Estudo de viabilidade ambiental', ativo: true },
    { id: 4, prazo: 45, contexto: 'Renovação de licença', ativo: false },
    { id: 5, prazo: 90, contexto: 'Licenciamento de grande porte', ativo: true },
    { id: 6, prazo: 20, contexto: 'Vistoria técnica', ativo: true },
    { id: 7, prazo: 10, contexto: 'Documentação complementar', ativo: true },
    { id: 8, prazo: 120, contexto: 'Estudo de impacto de vizinhança', ativo: false },
    { id: 9, prazo: 7, contexto: 'Notificação de irregularidade', ativo: true },
    { id: 10, prazo: 180, contexto: 'Licenciamento especial', ativo: true }
  ];

  useEffect(() => {
    setDiretrizes(mockDiretrizes);
    setFilteredDiretrizes(mockDiretrizes);
  }, []);

  useEffect(() => {
    const filtered = diretrizes.filter(diretriz =>
      diretriz.contexto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diretriz.prazo.toString().includes(searchTerm)
    );
    setFilteredDiretrizes(filtered);
  }, [searchTerm, diretrizes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDiretriz) {
      setDiretrizes(prev => prev.map(diretriz => 
        diretriz.id === editingDiretriz.id 
          ? { ...diretriz, ...formData, prazo: parseInt(formData.prazo) }
          : diretriz
      ));
    } else {
      const newDiretriz = {
        id: Math.max(...diretrizes.map(d => d.id)) + 1,
        ...formData,
        prazo: parseInt(formData.prazo)
      };
      setDiretrizes(prev => [...prev, newDiretriz]);
    }
    
    resetForm();
  };

  const handleEdit = (diretriz) => {
    setEditingDiretriz(diretriz);
    setFormData({
      prazo: diretriz.prazo.toString(),
      contexto: diretriz.contexto,
      ativo: diretriz.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta diretriz?')) {
      setDiretrizes(prev => prev.filter(diretriz => diretriz.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      prazo: '',
      contexto: '',
      ativo: true
    });
    setEditingDiretriz(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setDiretrizes(prev => prev.map(diretriz => 
      diretriz.id === id 
        ? { ...diretriz, ativo: !diretriz.ativo }
        : diretriz
    ));
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <div className="header-content">
          <h1>Diretrizes</h1>
          <p>Gerenciamento de diretrizes e normas do sistema</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Cadastrar Diretriz
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingDiretriz ? 'Editar Diretriz' : 'Cadastrar Diretriz'}</h2>
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
                  placeholder="Digite o título da diretriz"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição *</label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Digite a descrição da diretriz"
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
                  <option value="Ambiental">Ambiental</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Qualidade">Qualidade</option>
                  <option value="Operacional">Operacional</option>
                  <option value="Administrativa">Administrativa</option>
                </select>
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
                  {editingDiretriz ? 'Atualizar' : 'Cadastrar'}
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
              placeholder="Pesquisar diretrizes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            <span>{filteredDiretrizes.length} registro(s) encontrado(s)</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiretrizes.map(diretriz => (
                <tr key={diretriz.id}>
                  <td>{diretriz.id}</td>
                  <td>{diretriz.titulo}</td>
                  <td className="contexto-cell">{diretriz.descricao}</td>
                  <td>
                    <span className="categoria-badge">{diretriz.categoria}</span>
                  </td>
                  <td>
                    <Toggle
                      checked={diretriz.ativo}
                      onChange={() => handleToggleStatus(diretriz.id)}
                      id={`toggle-${diretriz.id}`}
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(diretriz)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(diretriz.id)}
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
          
          {filteredDiretrizes.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>Nenhuma diretriz encontrada</h3>
              <p>Tente ajustar os filtros de pesquisa ou cadastre uma nova diretriz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diretrizes;