import { useState } from "react";
import axios from "axios";
import styles from "./cadastro-cliente.module.css";
import Image from "../../assets/gatoo.jpeg";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { PawPrint } from "lucide-react";

export function CadastroCliente() {
  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    telefone: "",
    cep: "",
    numero: "",
    email: "",
    senha: "",
  });

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  // Função para formatar CEP
  const formatarCEP = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const limitado = apenasNumeros.slice(0, 8);

    if (limitado.length <= 5) {
      return limitado;
    } else {
      return `${limitado.slice(0, 5)}-${limitado.slice(5)}`;
    }
  };

  const validarCampos = () => {
    const erros = [];

    if (!dados.nome || dados.nome.trim() === "") {
      erros.push("Nome é obrigatório.");
    }

    // Validação CPF atualizada
    if (!dados.cpf || dados.cpf.trim() === "") {
      erros.push("CPF é obrigatório.");
    } else {
      const apenasNumeros = dados.cpf.replace(/\D/g, "");

      if (apenasNumeros.length !== 11) {
        erros.push("CPF deve conter 11 dígitos.");
      } else if (/^(\d)\1{10}$/.test(apenasNumeros)) {
        erros.push("CPF inválido.");
      } else {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(dados.cpf)) {
          erros.push("Formato do CPF inválido, esperado xxx.xxx.xxx-xx.");
        }
      }
    }

    if (!dados.dataDeNascimento) {
      erros.push("A data de nascimento deve ser preenchida.");
    }

    // Validação Telefone atualizada
    if (!dados.telefone || dados.telefone.trim() === "") {
      erros.push("Telefone é obrigatório.");
    } else {
      const apenasNumeros = dados.telefone.replace(/\D/g, "");
      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(dados.telefone)) {
        erros.push("Telefone inválido, formato esperado: (XX) 9XXXX-XXXX");
      }
    }

    // Validação CEP atualizada
    if (!dados.cep || dados.cep.trim() === "") {
      erros.push("CEP é obrigatório.");
    } else {
      const apenasNumeros = dados.cep.replace(/\D/g, "");

      if (apenasNumeros.length !== 8) {
        erros.push("CEP deve conter 8 dígitos.");
      } else {
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(dados.cep)) {
          erros.push("Formato do CEP inválido.");
        }
      }
    }

    const numeroRegex = /^[1-9]\d*$|^s\/n$/i;
    if (!dados.numero || !numeroRegex.test(dados.numero)) {
      erros.push("Número residencial deve ser um número positivo ou 'S/N'");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dados.email || !emailRegex.test(dados.email)) {
      erros.push("Email inválido.");
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!dados.senha || !senhaRegex.test(dados.senha)) {
      erros.push("A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, número e caractere especial.");
    }

    // Validação da confirmação de senha
    if (dados.senha !== confirmaSenha) {
      erros.push("As senhas não coincidem.");
    }

    return erros;
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
      await axios.post("http://localhost:8080/cliente/cadastro", dados);
      alert("Cliente cadastrado com sucesso!");

      // Limpar formulário
      setDados({
        nome: "",
        cpf: "",
        dataDeNascimento: "",
        telefone: "",
        cep: "",
        numero: "",
        email: "",
        senha: "",
      });
      setConfirmaSenha("");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);

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

  console.log("Dados válidos:", dados);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.pagina}>
        <div className={styles.painelEsquerdo}>
          <img src={Image} alt="FOTO DO GATO" className={styles.imagemGato} />
        </div>
        <div className={styles.painelDireito}>
          <nav className={styles.navbar}>
            <span className={styles.titulo}>Cadastro</span>
            <ul>
              <li className={styles.navItem} onClick={() => navigate("/home")}>
                HOME
              </li>
              <li className={styles.navItem} onClick={() => navigate("/sobre")}>
                SOBRE
              </li>
              <li className={styles.navItemLogin} onClick={() => navigate("/login")}>
                LOGIN
              </li>
            </ul>
          </nav>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formNome}>
              <label className={styles.labelItens} htmlFor="nomeInput">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome completo."
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                required
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="XXX.XXX.XXX-XX"
                value={dados.cpf}
                onChange={(e) => {
                  const cpfFormatado = formatarCPF(e.target.value);
                  setDados({ ...dados, cpf: cpfFormatado });
                }}
                maxLength={14}
                required
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>Data de Nascimento</label>
              <input
                type="date"
                name="dataDeNascimento"
                placeholder="Digite sua data de nascimento"
                value={dados.dataDeNascimento}
                onChange={(e) => setDados({ ...dados, dataDeNascimento: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>Telefone</label>
              <input
                type="text"
                name="telefone"
                placeholder="(XX) 9XXXX-XXXX"
                value={dados.telefone}
                onChange={(e) => {
                  const telefoneFormatado = formatarTelefone(e.target.value);
                  setDados({ ...dados, telefone: telefoneFormatado });
                }}
                maxLength={15}
                required
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>CEP</label>
              <input
                type="text"
                name="cep"
                placeholder="CEP (código postal)"
                value={dados.cep}
                onChange={(e) => {
                  const cepFormatado = formatarCEP(e.target.value);
                  setDados({ ...dados, cep: cepFormatado });
                }}
                maxLength={9}
                required
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>Número Residencial</label>
              <input
                type="text"
                name="numeroResidencial"
                placeholder="Digite o número da sua residência"
                value={dados.numero}
                onChange={(e) => setDados({ ...dados, numero: e.target.value })}
              />
            </div>

            <div className={styles.formNome}>
              <label className={styles.labelItens}>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Digite seu email"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.password}>
              <div className={styles.senha}>
                <label className={styles.label}>Senha </label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={dados.senha}
                  onChange={(e) => setDados({ ...dados, senha: e.target.value })}
                  required
                />
                {/* <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleSenha}>
                  {showPassword ? <Eye size="20" color="#8F8F8F" /> : <EyeOff size="20" color="#8F8F8F" />}
                </button> */}
              </div>
              <div className={styles.senha}>
                <label className={styles.label}> Confirme sua Senha </label>
                <input
                  type="password"
                  name="confirmaSenha"
                  placeholder="Digite sua senha novamente"
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.ButtonEnviar}>
              Cadastrar-se
            </button>
            <span className={styles.bottomLink} onClick={() => navigate("/funcionario/cadastro")}>
              Cadastre-se como Funcionário
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
