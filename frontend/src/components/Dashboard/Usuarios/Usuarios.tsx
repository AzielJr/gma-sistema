import React, { useState } from 'react';
import './Usuarios.css';

interface Usuario {
  id: number;
  foto: string;
  nome: string;
  celular: string;
  email: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  nivelAcesso: string;
}

const Usuarios: React.FC = () => {
  
  // Dados fictícios dos usuários
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      foto: 'https://i.pravatar.cc/150?img=1',
      nome: 'Ana Silva Santos',
      celular: '(11) 99999-1111',
      email: 'ana.silva@email.com',
      dataNascimento: '1985-03-15',
      cpf: '123.456.789-01',
      rg: '12.345.678-9',
      cep: '01234-567',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      nivelAcesso: 'Administrador'
    },
    {
      id: 2,
      foto: 'https://i.pravatar.cc/150?img=2',
      nome: 'Bruno Costa Lima',
      celular: '(11) 99999-2222',
      email: 'bruno.costa@email.com',
      dataNascimento: '1990-07-22',
      cpf: '987.654.321-09',
      rg: '98.765.432-1',
      cep: '04567-890',
      endereco: 'Av. Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP',
      nivelAcesso: 'Operador'
    },
    {
      id: 3,
      foto: 'https://i.pravatar.cc/150?img=3',
      nome: 'Carlos Eduardo Pereira',
      celular: '(11) 99999-3333',
      email: 'carlos.pereira@email.com',
      dataNascimento: '1988-12-10',
      cpf: '456.789.123-45',
      rg: '45.678.912-3',
      cep: '02345-678',
      endereco: 'Rua Augusta',
      numero: '500',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      uf: 'SP',
      nivelAcesso: 'Supervisor'
    },
    {
      id: 4,
      foto: 'https://i.pravatar.cc/150?img=4',
      nome: 'Diana Ferreira Oliveira',
      celular: '(11) 99999-4444',
      email: 'diana.oliveira@email.com',
      dataNascimento: '1992-05-18',
      cpf: '789.123.456-78',
      rg: '78.912.345-6',
      cep: '03456-789',
      endereco: 'Rua Oscar Freire',
      numero: '200',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      uf: 'SP',
      nivelAcesso: 'Operador'
    },
    {
      id: 5,
      foto: 'https://i.pravatar.cc/150?img=5',
      nome: 'Eduardo Santos Rocha',
      celular: '(11) 99999-5555',
      email: 'eduardo.rocha@email.com',
      dataNascimento: '1987-09-30',
      cpf: '321.654.987-32',
      rg: '32.165.498-7',
      cep: '05678-901',
      endereco: 'Rua Haddock Lobo',
      numero: '800',
      bairro: 'Cerqueira César',
      cidade: 'São Paulo',
      uf: 'SP',
      nivelAcesso: 'Administrador'
    }
  ]);

  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>(usuarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  
  // Adicionar o estado formData
  const [formData, setFormData] = useState<Usuario>({
    id: 0,
    foto: '',
    nome: '',
    celular: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    nivelAcesso: ''
  });

  // Estado para validação do celular   
  const [isCelularValid, setIsCelularValid] = useState(true);
// Adicione um comentário como teste
// Teste de deploy - [data atual]
  const [isCelularValid, setIsCelularValid] = useState(true);

  // Função para capturar foto do WhatsApp
  const handleWhatsAppPhoto = async () => { 
    if (!formData.celular) {
      alert('Por favor, informe o número do celular primeiro.');
      return;
    }
  
    // Verificar se temos instância e token configurados
    const instanciaWhatsApp = 'WUESIC-VG75IT-C2GZ4X';
    const tokenWhatsApp = 'yXDOq3P62t9qby2tcyZ3ToLJG92Ac9BlU';
  
    if (!instanciaWhatsApp || !tokenWhatsApp) {
      alert('Configuração do WhatsApp não encontrada. Verifique as credenciais.');
      return;
    }
  
    setIsLoadingPhoto(true);
    
    try {
      // Remover TODA formatação e adicionar 55 no início
      let phoneNumber = formData.celular.replace(/\D/g, '');
      
      // Log do número original
      console.log('Número original (com formatação):', formData.celular);
      console.log('Número sem formatação:', phoneNumber);
      
      // Garantir que não há código de país duplicado
      if (phoneNumber.startsWith('55')) {
        phoneNumber = phoneNumber.substring(2);
        console.log('Removido 55 duplicado, número agora:', phoneNumber);
      }
      
      // Adicionar código do país 55
      phoneNumber = '55' + phoneNumber;
      
      console.log('Número final para API:', phoneNumber);
      console.log('URL da API:', `https://api.w-api.app/v1/contacts/profile-picture?instanceId=${instanciaWhatsApp}&phoneNumber=${phoneNumber}`);
      
      const response = await fetch(`https://api.w-api.app/v1/contacts/profile-picture?instanceId=${instanciaWhatsApp}&phoneNumber=${phoneNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenWhatsApp}`
        }
      });
  
      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos completos:', JSON.stringify(data, null, 2));
        
        let photoUrl = null;
        
        // Verificar todos os possíveis campos onde a foto pode estar
        console.log('Verificando campos da resposta:');
        console.log('data.success:', data.success);
        console.log('data.data:', data.data);
        console.log('data.data?.imgUrl:', data.data?.imgUrl);
        console.log('data.data?.profilePictureUrl:', data.data?.profilePictureUrl);
        console.log('data.data?.url:', data.data?.url);
        console.log('data.data?.link:', data.data?.link);
        console.log('data.imgUrl:', data.imgUrl);
        console.log('data.profilePictureUrl:', data.profilePictureUrl);
        console.log('data.url:', data.url);
        console.log('data.link:', data.link);
        console.log('data.image:', data.image);
        console.log('data.picture:', data.picture);
        console.log('data.avatar:', data.avatar);
        
        // Tentar todos os campos possíveis
        if (data.success && data.data && data.data.imgUrl) {
          photoUrl = data.data.imgUrl;
          console.log('Foto encontrada em: data.data.imgUrl');
        } else if (data.success && data.data && data.data.profilePictureUrl) {
          photoUrl = data.data.profilePictureUrl;
          console.log('Foto encontrada em: data.data.profilePictureUrl');
        } else if (data.success && data.data && data.data.url) {
          photoUrl = data.data.url;
          console.log('Foto encontrada em: data.data.url');
        } else if (data.success && data.data && data.data.link) {
          photoUrl = data.data.link;
          console.log('Foto encontrada em: data.data.link');
        } else if (data.imgUrl) {
          photoUrl = data.imgUrl;
          console.log('Foto encontrada em: data.imgUrl');
        } else if (data.profilePictureUrl) {
          photoUrl = data.profilePictureUrl;
          console.log('Foto encontrada em: data.profilePictureUrl');
        } else if (data.url) {
          photoUrl = data.url;
          console.log('Foto encontrada em: data.url');
        } else if (data.link) {
          photoUrl = data.link;
          console.log('Foto encontrada em: data.link');
        } else if (data.image) {
          photoUrl = data.image;
          console.log('Foto encontrada em: data.image');
        } else if (data.picture) {
          photoUrl = data.picture;
          console.log('Foto encontrada em: data.picture');
        } else if (data.avatar) {
          photoUrl = data.avatar;
          console.log('Foto encontrada em: data.avatar');
        }
        
        console.log('URL da foto encontrada:', photoUrl);
        
        if (photoUrl) {
          setFormData(prev => ({
            ...prev,
            foto: photoUrl
          }));
        } else {
          console.log('Estrutura da resposta não contém URL de foto válida');
          alert('Nenhuma foto encontrada para este número.');
        }
      } else {
        const errorText = await response.text();
        console.log('Erro HTTP:', response.status);
        console.log('Texto do erro:', errorText);
        alert(`Erro ${response.status}: ${errorText || 'Verifique o número e tente novamente.'}`);
      }
      
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      alert('Erro ao conectar com a API do WhatsApp.');
    } finally {
      setIsLoadingPhoto(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsuarios(usuarios);
    } else {
      const filtered = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(term.toLowerCase()) ||
        usuario.email.toLowerCase().includes(term.toLowerCase()) ||
        usuario.cpf.includes(term)
      );
      setFilteredUsuarios(filtered);
    }
  };

  // Função para formatar celular em tempo real (apenas 11 dígitos)
  const formatCelular = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (celular brasileiro)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica formatação progressiva
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // Função para validar celular (deve ter 11 dígitos)
  const validateCelular = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'celular') {
      const formattedValue = formatCelular(value);
      setFormData(prev => ({
        ...prev,
        celular: formattedValue
      }));
      setIsCelularValid(validateCelular(formattedValue));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do usuário:', formData);
    // Aqui você implementaria a lógica de salvar
    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      id: 0,
      foto: '',
      nome: '',
      celular: '',
      email: '',
      dataNascimento: '',
      cpf: '',
      rg: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      nivelAcesso: ''
    });
  };

  const handleEdit = (usuario: Usuario) => {
    setFormData(usuario);
    setEditingId(usuario.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      console.log('Excluir usuário:', id);
      // Implementar lógica de exclusão
    }
  };

  // Função para buscar dados do CEP
  const buscarDadosCEP = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      alert('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      // Preencher automaticamente os campos
      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || ''
      }));

      // Focar no campo número após um pequeno delay
      setTimeout(() => {
        const numeroField = document.querySelector('input[name="numero"]');
        if (numeroField) {
          numeroField.focus();
        }
      }, 100);

    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao consultar CEP. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar CEP
  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      setFormData(prev => ({ ...prev, cep: value }));
    }
  };

  if (showForm) {
    return (
      <div className="usuarios-container">
        <div className="usuarios-header">
          <div className="header-content">
            <h2>{editingId ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
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

        <form onSubmit={handleSubmit} className="usuarios-form">
          <div className="form-content">
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              
              <div className="form-row">
                <div className="form-group photo-upload">
                  <label>Foto do Usuário:</label>
                  <div className="photo-container">
                    <div className="photo-preview" onClick={() => document.getElementById('photo-input')?.click()}>
                      {formData.foto ? (
                        <>
                          <img src={formData.foto} alt="Preview" />
                          <button
                            type="button"
                            className="photo-remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, foto: '' }));
                            }}
                            title="Remover foto"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="photo-placeholder">
                          <span>📷</span>
                          <p>Clique para adicionar foto</p>
                        </div>
                      )}
                    </div>
                    <input
                      id="photo-input"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validar tamanho do arquivo (máximo 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert('A imagem deve ter no máximo 5MB');
                            return;
                          }
                          
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setFormData(prev => ({ ...prev, foto: e.target?.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="photo-upload-btn"
                      onClick={() => document.getElementById('photo-input')?.click()}
                    >
                      {formData.foto ? 'Alterar Foto' : 'Escolher Foto'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row first-row">
                <div className="form-group nome-completo">
                  <label>Nome Completo:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group celular">
                  <label>Celular:</label>
                  <div className="input-with-whatsapp">
                    <input
                      type="text"
                      name="celular"
                      value={formData.celular}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className={isCelularValid ? '' : 'invalid'}
                    />
                    <div 
                      className={`whatsapp-icon ${isLoadingPhoto ? 'loading' : ''}`}
                      title="Capturar Foto do WhatsApp"
                      onClick={handleWhatsAppPhoto}
                    >
                      {isLoadingPhoto ? (
                        <div className="loading-spinner">⟳</div>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="#25D366"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h3>Endereço</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento:</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CPF:</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="form-group">
                  <label>RG:</label>
                  <input
                    type="text"
                    name="rg"
                    value={formData.rg}
                    onChange={handleInputChange}
                    placeholder="00.000.000-0"
                  />
                </div>
              </div>

              <h3>Endereço</h3>
              <div className="form-row">
                <div className="form-group cep-field">
                  <label>CEP:</label>
                  <div className="input-with-search">
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleCEPChange}
                      className="form-control"
                      placeholder="00000-000"
                    />
                    <button 
                      type="button" 
                      className="search-icon-btn" 
                      onClick={buscarDadosCEP}
                      disabled={loading}
                      title="Capturar Endereço"
                    >
                      {loading ? '⏳' : '🔍'}
                    </button>
                  </div>
                </div>
                <div className="form-group endereco-field">
                  <label>Endereço:</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group numero-field">
                  <label>Número:</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bairro:</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Cidade:</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>UF:</label>
                  <select
                    name="uf"
                    value={formData.uf}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    <option value="RS">RS</option>
                    <option value="PR">PR</option>
                    <option value="SC">SC</option>
                  </select>
                </div>
              </div>

              <h3>Configurações de Acesso</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nível de Acesso:</label>
                  <select
                    name="nivelAcesso"
                    value={formData.nivelAcesso}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Operador">Operador</option>
                    <option value="Consulta">Consulta</option>
                  </select>
                </div>
              </div>
            </div>
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
    <div className="usuarios-container">
      <div className="usuarios-header">
        <div className="header-content">
          <h2>Usuários</h2>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Buscar por nome, email ou CPF..."
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

      <div className="usuarios-content">
        <div className="usuarios-table">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Celular</th>
                <th>Nível de Acesso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-data">
                    Nenhum usuário encontrado. Clique em "Cadastrar" para adicionar um novo usuário.
                  </td>
                </tr>
              ) : (
                filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <div className="user-avatar">
                        <img src={usuario.foto} alt={usuario.nome} />
                      </div>
                    </td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.celular}</td>
                    <td>
                      <span className={`nivel-badge ${usuario.nivelAcesso.toLowerCase()}`}>
                        {usuario.nivelAcesso}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(usuario)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(usuario.id)}
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

export default Usuarios;