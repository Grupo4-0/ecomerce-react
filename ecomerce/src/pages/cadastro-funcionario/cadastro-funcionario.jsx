import { useState } from 'react';
import axios from 'axios';
import styles from './cadastro-funcionario.module.css';

export function CadastroFuncionario() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    genero: '',
    telefone: '',
    cargo: '',
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/funcionario/cadastro', form);
      alert('Funcionário cadastrado com sucesso!');
      setForm({
        nome: '',
        cpf: '',
        dataDeNascimento: '',
        genero: '',
        telefone: '',
        cargo: '',
        email: '',
        senha: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar. Veja o console para mais detalhes.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Funcionário</h2>
      <form onSubmit={handleSubmit}>
        {['nome', 'cpf', 'dataDeNascimento', 'telefone', 'email', 'senha'].map((field) => (
          <div className={styles.inputGroup} key={field}>
            <label>{field}</label>
            <input
              type={field === 'senha' ? 'password' : field === 'dataDeNascimento' ? 'date' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className={styles.inputGroup}>
          <label>Gênero</label>
          <select name="genero" value={form.genero} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Cargo</label>
          <select name="cargo" value={form.cargo} onChange={handleChange} required>
            <option value="PRESIDENTE">Presidente</option>
            <option value="AUXILIAR_ADMINISTRATIVO">Auxiliar Administrativo</option>
            <option value="ASSISTENTE_FINANCEIRO">Assistente Financeiro</option>
            <option value="GERENTE_ADMINISTRATIVO">Gerente Administrativo</option>
            <option value="TECNICO_DE_SUPORTE">Técnico de Suporte</option>
            <option value="DIRETOR_FINANCEIRO">Diretor Financeiro</option>
            <option value="SOCIO">Sócio</option>
            <option value="CONSULTOR">Consultor</option>
            <option value="DESENVOLVEDOR_FRONTEND">Desenvolvedor Frontend</option>
            <option value="DESENVOLVEDOR_BACKEND">Desenvolvedor Backend</option>
            <option value="RECEPCIONISTA">Recepcionista</option>
            <option value="COORDENADOR_DE_TI">Coordenador de TI</option>
            <option value="RECURSOS_HUMANOS">RH</option>
            <option value="GERENTE_DE_PROJETOS">Gerente de Projetos</option>
            <option value="SUPERVISOR_DE_VENDAS">Supervisor de Vendas</option>
            <option value="ANALISTA_DE_SISTEMAS">Analista de Sistemas</option>
            <option value="ENGENHEIRO_DE_SOFTWARE">Engenheiro de Software</option>
            <option value="ANALISTA_DE_RECURSOS_HUMANOS">Analista RH</option>
            <option value="ASSISTENTE_ADMINISTRATIVO">Assistente Administrativo</option>
            <option value="ANALISTA_DE_MARKETING">Analista de Marketing</option>
            <option value="GERENTE_FINANCEIRO">Gerente Financeiro</option>
            <option value="DIRETOR_COMERCIAL">Diretor Comercial</option>
            <option value="ENGENHEIRO_DE_DADOS">Engenheiro de Dados</option>
            <option value="ANALISTA_FINANCEIRO">Analista Financeiro</option>
            <option value="ESTAGIARIO">Estagiário</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}

