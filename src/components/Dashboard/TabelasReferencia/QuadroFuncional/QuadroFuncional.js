import React, { useState, useEffect } from 'react';
import Toggle from '../../../Common/Toggle/Toggle';
import '../Nucleos/Nucleos.css';

const QuadroFuncional = () => {
  const [quadrosFuncionais, setQuadrosFuncionais] = useState([]);
  const [filteredQuadrosFuncionais, setFilteredQuadrosFuncionais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingQuadroFuncional, setEditingQuadroFuncional] = useState(null);
  const [formData, setFormData] = useState({
    cargo: '',
    nivel: '',
    carga_horaria: '',
    salario_base: '',
    requisitos: '',
    ativo: true
  });

  // Dados mockados
  const mockQuadrosFuncionais = [
    { 
      id: 1, 
      cargo: 'Analista Ambiental', 
      nivel: 'Superior', 
      carga_horaria: 40, 
      salario_base: 5500.00, 
      requisitos: 'Graduação em Engenharia Ambiental ou áreas afins',
      ativo: true 
    },
    { 
      id: 2, 
      cargo: 'Técnico em Meio Ambiente', 
      nivel: 'Médio/Técnico', 
      carga_horaria: 40, 
      salario_base: 3200.00, 
      requisitos: 'Curso técnico em Meio Ambiente ou áreas correlatas',
      ativo: true 
    },
    { 
      id: 3, 
      cargo: 'Fiscal Ambiental', 
      nivel: 'Superior', 
      carga_horaria: 40, 
      salario_base: 4800.00, 
      requisitos: 'Graduação em Biologia, Engenharia Ambiental ou Florestal',
      ativo: true 
    },
    { 
      id: 4, 
      cargo: 'Coordenador de Licenciamento', 
      nivel: 'Superior', 
      carga_horaria: 40, 
      salario_base: 7200.00, 
      requisitos: 'Graduação em área ambiental + especialização + experiência mínima de 5 anos',
      ativo: true 
    },
    { 
      id: 5, 
      cargo: 'Assistente Administrativo', 
      nivel: 'Médio', 
      carga_horaria: 40, 
      salario_base: 2800.00, 
      requisitos: 'Ensino médio completo + conhecimentos em informática',
      ativo: false 
    },
    { 
      id: 6, 
      cargo: 'Estagiário', 
      nivel: 'Superior Incompleto', 
      carga_horaria: 20, 
      salario_base: 800.00, 
      requisitos: 'Cursando graduação em área ambiental ou correlata',
      ativo: true 
    }
  ];

  useEffect(() => {
    setQuadrosFuncionais(mockQuadrosFuncionais);
    setFilteredQuadrosFuncionais(mockQuadrosFuncionais);
  }, []);

  useEffect(() => {
    const filtered = quadrosFuncionais.filter(quadro =>
      quadro.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quadro.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quadro.requisitos.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuadrosFuncionais(filtered);
  }, [searchTerm, quadrosFuncionais]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingQuadroFuncional) {
      setQuadrosFuncionais(prev => prev.map(quadro => 
        quadro.id === editingQuadroFuncional.id 
          ? { 
              ...quadro, 
              ...formData, 
              carga_horaria: parseInt(formData.carga_horaria),
              salario_base: parseFloat(formData.salario_base)
            }
          : quadro
      ));
    } else {
      const newQuadroFuncional = {
        id: Math.max(...quadrosFuncionais.map(q => q.id)) + 1,
        ...formData,
        carga_horaria: parseInt(formData.carga_horaria),
        salario_base: parseFloat(formData.salario_base)
      };
      setQuadrosFuncionais(prev => [...prev, newQuadroFuncional]);
    }
    
    resetForm();
  };

  const handleEdit = (quadroFuncional) => {
    setEditingQuadroFuncional(quadroFuncional);
    setFormData({
      cargo: quadroFuncional.cargo,
      nivel: quadroFuncional.nivel,
      carga_horaria: quadroFuncional.carga_horaria.toString(),
      salario_base: quadroFuncional.salario_base.toString(),
      requisitos: quadroFuncional.requisitos,
      ativo: quadroFuncional.ativo
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este quadro funcional?')) {
      setQuadrosFuncionais(prev => prev.filter(quadro => quadro.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      cargo: '',
      nivel: '',
      carga_horaria: '',
      salario_base: '',
      requisitos: '',
      ativo: true
    });
    setEditingQuadroFuncional(null);
    setShowForm(false);
  };

  const handleToggleStatus = (id) => {
    setQuadrosFuncionais(prev => prev.map(quadro => 
      quadro.id === id 
        ? { ...quadro, ativo: !quadro.ativo }
        : quadro
    ));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="tabela-referencia-container">
      <div className="tabela-header">
        <h1>Quadro Funcional</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Cadastrar
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container large-form">
            <h2>{editingQuadroFuncional ? 'Editar Quadro Funcional' : 'Novo Quadro Funcional'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cargo">Cargo:</label>
                  <input
                    type="text"
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nivel">Nível:</label>
                  <select
                    id="nivel"
                    value={formData.nivel}
                    onChange={(e) => setFormData({...formData, nivel: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Fundamental">Fundamental</option>
                    <option value="Médio">Médio</option>
                    <option value="Médio/Técnico">Médio/Técnico</option>
                    <option value="Superior">Superior</option>
                    <option value="Superior Incompleto">Superior Incompleto</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="carga_horaria">Carga Horária (horas/semana):</label>
                  <input
                    type="number"
                    id="carga_horaria"
                    value={formData.carga_horaria}
                    onChange={(e) => setFormData({...formData, carga_horaria: e.target.value})}
                    required
                    min="1"
                    max="44"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salario_base">Salário Base (R$):</label>
                  <input
                    type="number"
                    id="salario_base"
                    value={formData.salario_base}
                    onChange={(e) => setFormData({...formData, salario_base: e.target.value})}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="requisitos">Requisitos:</label>
                <textarea
                  id="requisitos"
                  value={formData.requisitos}
                  onChange={(e) => setFormData({...formData, requisitos: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <Toggle
                  id="ativo"
                  label="Ativo"
                  checked={formData.ativo}
                  onChange={(checked) => setFormData({...formData, ativo: checked})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingQuadroFuncional ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <div className="table-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar quadros funcionais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cargo</th>
                <th>Nível</th>
                <th>Carga Horária</th>
                <th>Salário Base</th>
                <th>Requisitos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuadrosFuncionais.length > 0 ? (
                filteredQuadrosFuncionais.map(quadro => (
                  <tr key={quadro.id}>
                    <td>{quadro.id}</td>
                    <td>{quadro.cargo}</td>
                    <td>
                      <span className="classificacao-badge">
                        {quadro.nivel}
                      </span>
                    </td>
                    <td>
                      <span className="prazo-badge">
                        {quadro.carga_horaria}h/sem
                      </span>
                    </td>
                    <td>
                      <span className="valor-badge">
                        {formatCurrency(quadro.salario_base)}
                      </span>
                    </td>
                    <td className="contexto-cell">{quadro.requisitos}</td>
                    <td>
                      <Toggle
                        checked={quadro.ativo}
                        onChange={() => handleToggleStatus(quadro.id)}
                      />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(quadro)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDelete(quadro.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    Nenhum quadro funcional encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuadroFuncional;