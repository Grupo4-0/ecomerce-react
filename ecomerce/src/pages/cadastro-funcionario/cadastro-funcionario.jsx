import { useState } from "react";
import axios from "axios";
import styles from "./cadastro-funcionario.module.css";
import gatoo from "../../assets/gatoo.jpeg";
import { useNavigate } from "react-router-dom";

export function CadastroFuncionario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    genero: "",
    telefone: "",
    cargo: "",
    email: "",
    senha: "",
  });

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);

  // Função para formatar CPF
  const formatarCPF = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const limitado = apenasNumeros.slice(0, 11);

    if (limitado.length <= 3) {
      return limitado;
    } else if (limitado.length <= 6) {
      return `${limitado.slice(0, 3)}.${limitado.slice(3)}`;
    } else if (limitado.length <= 9) {
      return `${limitado.slice(0, 3)}.${limitado.slice(3, 6)}.${limitado.slice(6)}`;
    } else {
      return `${limitado.slice(0, 3)}.${limitado.slice(3, 6)}.${limitado.slice(6, 9)}-${limitado.slice(9)}`;
    }
  };

  // Função para formatar Telefone
  const formatarTelefone = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const limitado = apenasNumeros.slice(0, 11);

    if (limitado.length <= 2) {
      return limitado;
    } else if (limitado.length <= 3) {
      return `(${limitado.slice(0, 2)}) ${limitado.slice(2)}`;
    } else if (limitado.length <= 7) {
      return `(${limitado.slice(0, 2)}) ${limitado.slice(2, 3)}${limitado.slice(3)}`;
    } else {
      return `(${limitado.slice(0, 2)}) ${limitado.slice(2, 3)}${limitado.slice(3, 7)}-${limitado.slice(7)}`;
    }
  };

  const validarCampos = () => {
    const erros = [];

    if (!form.nome || form.nome.trim() === "") {
      erros.push("Nome é obrigatório.");
    }

    // Validação CPF atualizada
    if (!form.cpf || form.cpf.trim() === "") {
      erros.push("CPF é obrigatório.");
    } else {
      const apenasNumeros = form.cpf.replace(/\D/g, "");

      if (apenasNumeros.length !== 11) {
        erros.push("CPF deve conter 11 dígitos.");
      } else if (/^(\d)\1{10}$/.test(apenasNumeros)) {
        erros.push("CPF inválido.");
      } else {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(form.cpf)) {
          erros.push("Formato do CPF inválido, esperado xxx.xxx.xxx-xx.");
        }
      }
    }

    if (!form.dataDeNascimento) {
      erros.push("A data de nascimento deve ser preenchida.");
    }

    // Validação Telefone atualizada
    if (!form.telefone || form.telefone.trim() === "") {
      erros.push("Telefone é obrigatório.");
    } else {
      const apenasNumeros = form.telefone.replace(/\D/g, "");
      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(form.telefone)) {
        erros.push("Telefone inválido, formato esperado: (XX) 9XXXX-XXXX");
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      erros.push("Email inválido.");
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!form.senha || !senhaRegex.test(form.senha)) {
      erros.push("A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, número e caractere especial.");
    }

    // Validação da confirmação de senha
    if (form.senha !== confirmaSenha) {
      erros.push("As senhas não coincidem.");
    }

    return erros;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Executar todas as validações
    const erros = validarCampos();

    if (erros.length > 0) {
      alert("ERRO!!\n\n" + erros.join("\n"));
      return;
    }


    try {
      await axios.post("http://localhost:8080/funcionario/cadastro", form);
      alert("Funcionário cadastrado com sucesso!");
      
      
      setForm({
        nome: "",
        cpf: "",
        dataDeNascimento: "",
        genero: "",
        telefone: "",
        cargo: "",
        email: "",
        senha: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);

      // Se o backend retornar erros de validação
      if (error.response?.data?.message) {
        alert("Erro: " + error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errosBackend = error.response.data.errors.map((err) => err.message || err);
        alert("Erros do servidor:\n\n" + errosBackend.join("\n"));
      } else {
        alert("Erro ao cadastrar. Veja o console para mais detalhes.");
      }
    }
  };

  console.log("Dados válidos:", form);
  const navigate = useNavigate();

  return (
    <div className={styles.pagina}>
      <div className={styles.painelEsquerdo}>
        <img src={gatoo} alt="Gato deitado na grama" className={styles.imagemGato} />
      </div>
      <div className={styles.painelDireito}>
        <nav className={styles.navbar}>
          <span className={styles.titulo}>Cadastro Funcionário</span>
          <div>
            <a className={styles.navItem} onClick={() => navigate("/homeFuncionario")}>HOME</a>
            <a className={styles.navItem} onClick={() => navigate("/sobre")}>SOBRE</a>
            <a className={styles.navItemLogin} onClick={() => navigate("/login")}>LOGIN</a>
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
            <label className={styles.label}>Gênero</label>{" "}
            <select name="genero" value={form.genero} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>{" "}
            </select>{" "}
          </div>

          <div className={styles.formNome}>
            <label className={styles.label}>Cargo</label>
            <select name="cargo" value={form.cargo} onChange={handleChange} required>
              // <option value="PRESIDENTE">Presidente</option>
              // <option value="AUXILIAR_ADMINISTRATIVO">Auxiliar Administrativo</option>
              // <option value="ASSISTENTE_FINANCEIRO">Assistente Financeiro</option>
              // <option value="GERENTE_ADMINISTRATIVO">Gerente Administrativo</option>
              // <option value="TECNICO_DE_SUPORTE">Técnico de Suporte</option>
              // <option value="DIRETOR_FINANCEIRO">Diretor Financeiro</option>
              // <option value="SOCIO">Sócio</option>
              // <option value="CONSULTOR">Consultor</option>
              // <option value="DESENVOLVEDOR_FRONTEND">Desenvolvedor Frontend</option>
              // <option value="DESENVOLVEDOR_BACKEND">Desenvolvedor Backend</option>
              // <option value="RECEPCIONISTA">Recepcionista</option>
              // <option value="COORDENADOR_DE_TI">Coordenador de TI</option>
              // <option value="RECURSOS_HUMANOS">RH</option>
              // <option value="GERENTE_DE_PROJETOS">Gerente de Projetos</option>
              // <option value="SUPERVISOR_DE_VENDAS">Supervisor de Vendas</option>
              // <option value="ANALISTA_DE_SISTEMAS">Analista de Sistemas</option>
              // <option value="ENGENHEIRO_DE_SOFTWARE">Engenheiro de Software</option>
              // <option value="ANALISTA_DE_RECURSOS_HUMANOS">Analista RH</option>
              // <option value="ASSISTENTE_ADMINISTRATIVO">Assistente Administrativo</option>
              // <option value="ANALISTA_DE_MARKETING">Analista de Marketing</option>
              // <option value="GERENTE_FINANCEIRO">Gerente Financeiro</option>
              // <option value="DIRETOR_COMERCIAL">Diretor Comercial</option>
              // <option value="ENGENHEIRO_DE_DADOS">Engenheiro de Dados</option>
              // <option value="ANALISTA_FINANCEIRO">Analista Financeiro</option>
              // <option value="ESTAGIARIO">Estagiário</option>
              //{" "}
            </select>
          </div>

          <div className={styles.formNome}>
            <label className={styles.label}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles.password}>
            <div>
              <label className={styles.label}>Senha </label>
              <input
                 type={mostrarSenha ? "text" : "password"}
                 name="senha"
                 value={form.senha}
                 onChange={handleChange}
                 required
              />
              <button
                 type="button"
                 onClick={() => setMostrarSenha(!mostrarSenha)}
                 className={styles.toggleButton}
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
           </div>
            <div>
              <label className={styles.label}>Confirmar Senha </label>
              <input
                type={mostrarConfirma ? "text" : "password"}
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
             <button
                type="button"
                onClick={() => setMostrarConfirma(!mostrarConfirma)}
                className={styles.toggleButton}
             >
                {mostrarConfirma ? " 🙈 " : " 👁️ "}
            </button>
            </div>
          </div>
          <button type="submit" className={styles.ButtonEnviar}>
            Cadastrar-se
          </button>
          <span className={styles.bottomLink} onClick={() => navigate("/cliente/cadastro")} >Cadastre-se como Cliente</span>
        </form>
      </div>
    </div>
  );
}
