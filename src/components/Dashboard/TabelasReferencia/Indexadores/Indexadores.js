import React, { useState } from 'react';
import './Indexadores.css';

const Indexadores = () => {
  const [indexadores, setIndexadores] = useState([
    {
      id: 1,
      data_inicio: '2024-01-01',
      ufm: 1000,
      juros: 2.5,
      multa: 10.0,
      taxa_bancaria: 1.5,
      taxa_protocolo: 25.00,
      validade: 30,
      vencimento: 15,
      sit: 'Ativo',
      ativo: true
    },
    {
      id: 2,
      data_inicio: '2024-02-01',
      ufm: 1100,
      juros: 3.0,
      multa: 12.0,
      taxa_bancaria: 2.0,
      taxa_protocolo: 30.00,
      validade: 45,
      vencimento: 20,
      sit: 'Pendente',
      ativo: true
    },
    {
      id: 3,
      data_inicio: '2024-03-01',
      ufm: 950,
      juros: 2.0,
      multa: 8.0,
      taxa_bancaria: 1.0,
      taxa_protocolo: 20.00,
      validade: 60,
      vencimento: 10,
      sit: 'Inativo',
      ativo: false
    }
  ]);

  const [filteredIndexadores, setFilteredIndexadores] = useState(indexadores);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndexador, setEditingIndexador] = useState(null);
  const [formData, setFormData] = useState({
    data_inicio: new Date().toISOString().split('T')[0],
    ufm: '',
    juros: '',
    multa: '',
    taxa_bancaria: '',
    taxa_protocolo: '',
    validade: '',
    vencimento: '',
    sit: '',
    ativo: true
  });

  // Filtrar indexadores
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredIndexadores(indexadores);
    } else {
      const filtered = indexadores.filter(indexador =>
        indexador.sit.toLowerCase().includes(term.toLowerCase()) ||
        indexador.data_inicio.toString().includes(term) ||
        indexador.ufm.toString().includes(term)
      );
      setFilteredIndexadores(filtered);
    }
  };

  // Abrir modal para novo indexador
  const handleNewIndexador = () => {
    setEditingIndexador(null);
    setFormData({
      data_inicio: '',
      ufm: '',
      juros: '',
      multa: '',
      taxa_bancaria: '',
      taxa_protocolo: '',
      validade: '',
      vencimento: '',
      sit: '',
      ativo: true
    });
    setShowModal(true);
  };

  // Abrir modal para editar indexador
  const handleEdit = (indexador) => {
    setEditingIndexador(indexador);
    setFormData({
      data_inicio: indexador.data_inicio,
      ufm: indexador.ufm,
      juros: indexador.juros,
      multa: indexador.multa,
      taxa_bancaria: indexador.taxa_bancaria,
      taxa_protocolo: indexador.taxa_protocolo,
      validade: indexador.validade,
      vencimento: indexador.vencimento,
      sit: indexador.sit,
      ativo: indexador.ativo
    });
    setShowModal(true);
  };

  // Salvar indexador
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.data_inicio || !formData.ufm || !formData.sit.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingIndexador) {
      // Editar indexador existente
      const updatedIndexadores = indexadores.map(indexador =>
        indexador.id === editingIndexador.id
          ? { 
              ...indexador, 
              ...formData,
              data_inicio: parseInt(formData.data_inicio),
              ufm: parseInt(formData.ufm),
              juros: parseFloat(formData.juros),
              multa: parseFloat(formData.multa),
              taxa_bancaria: parseFloat(formData.taxa_bancaria),
              taxa_protocolo: parseFloat(formData.taxa_protocolo),
              validade: parseInt(formData.validade),
              vencimento: parseInt(formData.vencimento)
            }
          : indexador
      );
      setIndexadores(updatedIndexadores);
      setFilteredIndexadores(updatedIndexadores);
    } else {
      // Criar novo indexador
      const newIndexador = {
        id: Math.max(...indexadores.map(i => i.id)) + 1,
        ...formData,
        data_inicio: parseInt(formData.data_inicio),
        ufm: parseInt(formData.ufm),
        juros: parseFloat(formData.juros),
        multa: parseFloat(formData.multa),
        taxa_bancaria: parseFloat(formData.taxa_bancaria),
        taxa_protocolo: parseFloat(formData.taxa_protocolo),
        validade: parseInt(formData.validade),
        vencimento: parseInt(formData.vencimento)
      };
      const updatedIndexadores = [...indexadores, newIndexador];
      setIndexadores(updatedIndexadores);
      setFilteredIndexadores(updatedIndexadores);
    }

    setShowModal(false);
    resetForm();
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      data_inicio: '',
      ufm: '',
      juros: '',
      multa: '',
      taxa_bancaria: '',
      taxa_protocolo: '',
      validade: '',
      vencimento: '',
      sit: '',
      ativo: true
    });
    setEditingIndexador(null);
  };

  // Excluir indexador
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este indexador?')) {
      const updatedIndexadores = indexadores.filter(indexador => indexador.id !== id);
      setIndexadores(updatedIndexadores);
      setFilteredIndexadores(updatedIndexadores);
    }
  };

  // Toggle status
  const toggleStatus = (id) => {
    const updatedIndexadores = indexadores.map(indexador =>
      indexador.id === id ? { ...indexador, ativo: !indexador.ativo } : indexador
    );
    setIndexadores(updatedIndexadores);
    setFilteredIndexadores(updatedIndexadores);
  };

  // Formatar data para exibição
  const formatDate = (dateInt) => {
    const dateStr = dateInt.toString();
    if (dateStr.length === 8) {
      return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}/${dateStr.slice(0, 4)}`;
    }
    return dateStr;
  };

  return (
    <div className="indexadores-container">
      <div className="page-header">
        <h1>Indexadores</h1>
        <p>Gerencie os indexadores do sistema</p>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div className="search-section">
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Buscar por situação, data ou UFM..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary" onClick={handleNewIndexador}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Indexador
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data Início</th>
                <th>UFM</th>
                <th>Juros (%)</th>
                <th>Multa (%)</th>
                <th>Taxa Bancária (%)</th>
                <th>Taxa Protocolo</th>
                <th>Validade (dias)</th>
                <th>Vencimento (dias)</th>
                <th>Situação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndexadores.map(indexador => (
                <tr key={indexador.id}>
                  <td>{indexador.id}</td>
                  <td>{new Date(indexador.data_inicio).toLocaleDateString('pt-BR')}</td>
                  <td>{indexador.ufm}</td>
                  <td>{indexador.juros.toFixed(2)}%</td>
                  <td>{indexador.multa.toFixed(2)}%</td>
                  <td>{indexador.taxa_bancaria.toFixed(2)}%</td>
                  <td>R$ {indexador.taxa_protocolo.toFixed(2)}</td>
                  <td>{indexador.validade}</td>
                  <td>{indexador.vencimento}</td>
                  <td>{indexador.sit}</td>
                  <td>
                    <button
                      className={`status-toggle ${indexador.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(indexador.id)}
                    >
                      {indexador.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(indexador)}
                        title="Editar"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(indexador.id)}
                        title="Excluir"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingIndexador ? 'Editar Indexador' : 'Novo Indexador'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="data_inicio">Data Início *</label>
                  <input
                    type="date"
                    id="data_inicio"
                    value={formData.data_inicio}
                    onChange={(e) => setFormData({...formData, data_inicio: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ufm">UFM *</label>
                  <input
                    type="number"
                    id="ufm"
                    value={formData.ufm}
                    onChange={(e) => setFormData({...formData, ufm: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="juros">Juros (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="juros"
                    value={formData.juros}
                    onChange={(e) => setFormData({...formData, juros: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="multa">Multa (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="multa"
                    value={formData.multa}
                    onChange={(e) => setFormData({...formData, multa: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="taxa_bancaria">Taxa Bancária (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="taxa_bancaria"
                    value={formData.taxa_bancaria}
                    onChange={(e) => setFormData({...formData, taxa_bancaria: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="taxa_protocolo">Taxa Protocolo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="taxa_protocolo"
                    value={formData.taxa_protocolo}
                    onChange={(e) => setFormData({...formData, taxa_protocolo: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="validade">Validade (dias)</label>
                  <input
                    type="number"
                    id="validade"
                    value={formData.validade}
                    onChange={(e) => setFormData({...formData, validade: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vencimento">Vencimento (dias)</label>
                  <input
                    type="number"
                    id="vencimento"
                    value={formData.vencimento}
                    onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sit">Situação *</label>
                  <select
                    id="sit"
                    value={formData.sit}
                    onChange={(e) => setFormData({...formData, sit: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                    />
                    Ativo
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingIndexador ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Indexadores;