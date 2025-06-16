
import { useState } from 'react';
import axios from 'axios';
import styles from './cadastro-funcionario.module.css';
import gatoo from '../../assets/gatoo.jpeg';

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
    <div className={styles.pagina}>
      <div className={styles.painelEsquerdo}>
        <img
          src={gatoo}
          alt="Gato deitado na grama"
          className={styles.imagemGato}
        />
      </div>
      <div className={styles.painelDireito}>
        <nav className={styles.navbar}>
          <span className={styles.titulo}>Cadastro Funcionário</span>
          <div>
            <a className={styles.navItem}>HOME</a>
            <a className={styles.navItem}>SOBRE</a>
            <a className={styles.navItemLogin}>LOGIN</a>
          </div>
        </nav>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formNome}>
            <label className={styles.label}>Nome Completo</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className={styles.formNome}>
            <label className={styles.label}>CPF</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
          </div>
          <div className={styles.formNome}>
            <label className={styles.label}>Data de nascimento:</label>
            <input type="date" name="dataDeNascimento" value={form.dataDeNascimento} onChange={handleChange} required />
          </div>
          <div className={styles.formNome}>
            <label className={styles.label}>Telefone</label>
            <input type="text" name="telefone" value={form.telefone} onChange={handleChange} required />
          </div>

          <div className={styles.formNome}>
//           <label className={styles.labelGenero}>Gênero</label>
//           <select name="genero" value={form.genero} onChange={handleChange} required>
//             <option value="">Selecione</option>
//             <option value="MASCULINO">Masculino</option>
//             <option value="FEMININO">Feminino</option>
//           </select>
//        </div>

          <div className={styles.formNome}>
            <label className={styles.label}>Cargo</label>
            <select name="cargo" value={form.cargo} onChange={handleChange} required>
//             <option value="PRESIDENTE">Presidente</option>
//             <option value="AUXILIAR_ADMINISTRATIVO">Auxiliar Administrativo</option>
//             <option value="ASSISTENTE_FINANCEIRO">Assistente Financeiro</option>
//             <option value="GERENTE_ADMINISTRATIVO">Gerente Administrativo</option>
//             <option value="TECNICO_DE_SUPORTE">Técnico de Suporte</option>
//             <option value="DIRETOR_FINANCEIRO">Diretor Financeiro</option>
//             <option value="SOCIO">Sócio</option>
//             <option value="CONSULTOR">Consultor</option>
//             <option value="DESENVOLVEDOR_FRONTEND">Desenvolvedor Frontend</option>
//             <option value="DESENVOLVEDOR_BACKEND">Desenvolvedor Backend</option>
//             <option value="RECEPCIONISTA">Recepcionista</option>
//             <option value="COORDENADOR_DE_TI">Coordenador de TI</option>
//             <option value="RECURSOS_HUMANOS">RH</option>
//             <option value="GERENTE_DE_PROJETOS">Gerente de Projetos</option>
//             <option value="SUPERVISOR_DE_VENDAS">Supervisor de Vendas</option>
//             <option value="ANALISTA_DE_SISTEMAS">Analista de Sistemas</option>
//             <option value="ENGENHEIRO_DE_SOFTWARE">Engenheiro de Software</option>
//             <option value="ANALISTA_DE_RECURSOS_HUMANOS">Analista RH</option>
//             <option value="ASSISTENTE_ADMINISTRATIVO">Assistente Administrativo</option>
//             <option value="ANALISTA_DE_MARKETING">Analista de Marketing</option>
//             <option value="GERENTE_FINANCEIRO">Gerente Financeiro</option>
//             <option value="DIRETOR_COMERCIAL">Diretor Comercial</option>
//             <option value="ENGENHEIRO_DE_DADOS">Engenheiro de Dados</option>
//             <option value="ANALISTA_FINANCEIRO">Analista Financeiro</option>
//             <option value="ESTAGIARIO">Estagiário</option>
//           </select>
          </div>

          <div className={styles.formNome}>
            <label className={styles.label}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles.password}>
            <div>
              <label className={styles.label}>Senha </label>
              <input type="password" name="senha" value={form.senha} onChange={handleChange} required />
            </div>
            <div>
              <label className={styles.label}>Confirmar Senha </label>
              <input type="password" />
            </div>
          </div>
          <button type="submit" className={styles.ButtonEnviar}>Cadastrar-se</button>
          <span className={styles.bottomLink}>Cadastre-se como Cliente</span>
        </form>
      </div>
    </div>
  );
}

