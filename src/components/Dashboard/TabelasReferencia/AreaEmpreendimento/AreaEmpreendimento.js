import React, { useState } from 'react';
import './AreaEmpreendimento.css';

const AreaEmpreendimento = () => {
  const [areas, setAreas] = useState([
    {
      id: 1,
      nomeclatura: 'Área Urbana',
      sigla: 'AU',
      faixa: 'Pequena',
      de: 100,
      ate: 1000,
      ativo: true
    },
    {
      id: 2,
      nomeclatura: 'Área Rural',
      sigla: 'AR',
      faixa: 'Média',
      de: 1001,
      ate: 5000,
      ativo: true
    },
    {
      id: 3,
      nomeclatura: 'Área Industrial',
      sigla: 'AI',
      faixa: 'Grande',
      de: 5001,
      ate: 20000,
      ativo: false
    },
    {
      id: 4,
      nomeclatura: 'Área Comercial',
      sigla: 'AC',
      faixa: 'Pequena',
      de: 50,
      ate: 500,
      ativo: true
    },
    {
      id: 5,
      nomeclatura: 'Área de Preservação',
      sigla: 'AP',
      faixa: 'Especial',
      de: 10000,
      ate: 100000,
      ativo: true
    }
  ]);

  const [filteredAreas, setFilteredAreas] = useState(areas);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [formData, setFormData] = useState({
    nomeclatura: '',
    sigla: '',
    faixa: '',
    de: '',
    ate: '',
    ativo: true
  });

  // Filtrar áreas
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredAreas(areas);
    } else {
      const filtered = areas.filter(area =>
        area.nomeclatura.toLowerCase().includes(term.toLowerCase()) ||
        area.sigla.toLowerCase().includes(term.toLowerCase()) ||
        area.faixa.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAreas(filtered);
    }
  };

  // Abrir modal para nova área
  const handleNewArea = () => {
    setEditingArea(null);
    setFormData({
      nomeclatura: '',
      sigla: '',
      faixa: '',
      de: '',
      ate: '',
      ativo: true
    });
    setShowModal(true);
  };

  // Abrir modal para editar área
  const handleEdit = (area) => {
    setEditingArea(area);
    setFormData({
      nomeclatura: area.nomeclatura,
      sigla: area.sigla,
      faixa: area.faixa,
      de: area.de,
      ate: area.ate,
      ativo: area.ativo
    });
    setShowModal(true);
  };

  // Salvar área
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nomeclatura.trim() || !formData.sigla.trim() || !formData.faixa.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingArea) {
      // Editar área existente
      const updatedAreas = areas.map(area =>
        area.id === editingArea.id
          ? { ...area, ...formData, de: parseInt(formData.de), ate: parseInt(formData.ate) }
          : area
      );
      setAreas(updatedAreas);
      setFilteredAreas(updatedAreas);
    } else {
      // Criar nova área
      const newArea = {
        id: Math.max(...areas.map(a => a.id)) + 1,
        ...formData,
        de: parseInt(formData.de),
        ate: parseInt(formData.ate)
      };
      const updatedAreas = [...areas, newArea];
      setAreas(updatedAreas);
      setFilteredAreas(updatedAreas);
    }

    setShowModal(false);
    resetForm();
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      nomeclatura: '',
      sigla: '',
      faixa: '',
      de: '',
      ate: '',
      ativo: true
    });
    setEditingArea(null);
  };

  // Excluir área
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta área?')) {
      const updatedAreas = areas.filter(area => area.id !== id);
      setAreas(updatedAreas);
      setFilteredAreas(updatedAreas);
    }
  };

  // Toggle status
  const toggleStatus = (id) => {
    const updatedAreas = areas.map(area =>
      area.id === id ? { ...area, ativo: !area.ativo } : area
    );
    setAreas(updatedAreas);
    setFilteredAreas(updatedAreas);
  };

  return (
    <div className="area-empreendimento-container">
      <div className="page-header">
        <h1>Área do Empreendimento</h1>
        <p>Gerencie as áreas de empreendimento do sistema</p>
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
                placeholder="Buscar por nomenclatura, sigla ou faixa..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary" onClick={handleNewArea}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nova Área
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nomenclatura</th>
                <th>Sigla</th>
                <th>Faixa</th>
                <th>De</th>
                <th>Até</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAreas.map(area => (
                <tr key={area.id}>
                  <td>{area.id}</td>
                  <td>{area.nomeclatura}</td>
                  <td>{area.sigla}</td>
                  <td>{area.faixa}</td>
                  <td>{area.de.toLocaleString()}</td>
                  <td>{area.ate.toLocaleString()}</td>
                  <td>
                    <button
                      className={`status-toggle ${area.ativo ? 'active' : 'inactive'}`}
                      onClick={() => toggleStatus(area.id)}
                    >
                      {area.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(area)}
                        title="Editar"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(area.id)}
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
              <h2>{editingArea ? 'Editar Área' : 'Nova Área'}</h2>
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
                  <label htmlFor="nomeclatura">Nomenclatura *</label>
                  <input
                    type="text"
                    id="nomeclatura"
                    value={formData.nomeclatura}
                    onChange={(e) => setFormData({...formData, nomeclatura: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sigla">Sigla *</label>
                  <input
                    type="text"
                    id="sigla"
                    value={formData.sigla}
                    onChange={(e) => setFormData({...formData, sigla: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="faixa">Faixa *</label>
                  <input
                    type="text"
                    id="faixa"
                    value={formData.faixa}
                    onChange={(e) => setFormData({...formData, faixa: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="de">De</label>
                  <input
                    type="number"
                    id="de"
                    value={formData.de}
                    onChange={(e) => setFormData({...formData, de: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ate">Até</label>
                  <input
                    type="number"
                    id="ate"
                    value={formData.ate}
                    onChange={(e) => setFormData({...formData, ate: e.target.value})}
                  />
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
                  {editingArea ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaEmpreendimento;