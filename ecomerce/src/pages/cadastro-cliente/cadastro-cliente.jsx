import React, { useState } from "react";
import styles from "./cadastro-cliente.module.css";

export function CadastroCliente() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    telefone: "",
    cep: "",
    numero: "",
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' ou 'error'

  // Função para aplicar máscara no CPF
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  // Função para aplicar máscara no telefone
  const formatTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // Função para aplicar máscara no CEP
  const formatCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  // Validações do frontend
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(formData.cpf)) {
      newErrors.cpf = "Formato inválido, esperado xxx.xxx.xxx-xx";
    }

    if (!formData.dataDeNascimento) {
      newErrors.dataDeNascimento = "A data de nascimento deve ser preenchido";
    }

    const telefoneRegex = /^\(\d{2}\) ?9?\d{4}-\d{4}$/;
    if (formData.telefone && !telefoneRegex.test(formData.telefone)) {
      newErrors.telefone = "Telefone inválido, formato esperado: (XX) 9XXXX-XXXX";
    }

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(formData.cep)) {
      newErrors.cep = "CEP inválido, esperado: 99999-999";
    }

    const numeroRegex = /^[1-9]\d*$|^s\/n$/i;
    if (!numeroRegex.test(formData.numero)) {
      newErrors.numero = "Número residencial deve ser um número positivo ou 'S/N'";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!senhaRegex.test(formData.senha)) {
      newErrors.senha =
        "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, número e caractere especial.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar máscaras
    if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "telefone") {
      formattedValue = formatTelefone(value);
    } else if (name === "cep") {
      formattedValue = formatCEP(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Limpar erro específico quando usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch("/cliente/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensagem);
        setMessageType("success");

        // Limpar formulário após sucesso
        setFormData({
          nome: "",
          cpf: "",
          dataDeNascimento: "",
          telefone: "",
          cep: "",
          numero: "",
          email: "",
          senha: "",
        });
      } else {
        if (data.mensagem) {
          setMessage(data.mensagem);
        } else if (data.message) {
          setMessage(data.message);
        } else {
          setMessage("Erro ao cadastrar cliente. Tente novamente.");
        }
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erro ao cadastrar cliente. Tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cadastroClienteContainer}>
      <div className={styles.cadastroClienteCard}>
        <div className={styles.cadastroClienteHeader}>
          <h2 className={styles.cadastroClienteTitulo}>Cadastro de Cliente</h2>
          <p className={styles.cadastroClienteSubtitulo}>Preencha todos os campos para criar sua conta</p>
        </div>

        {message && (
          <div
            className={`${styles.cadastroClienteMensagem} ${
              messageType === "success" ? styles.cadastroClienteMensagemSucesso : styles.cadastroClienteMensagemErro
            }`}
          >
            {message}
          </div>
        )}

        <div className={styles.cadastroClienteFormulario}>
          {/* Nome */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="nome" className={styles.cadastroClienteLabel}>
              Nome *
            </label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              className={`${styles.cadastroClienteInput} ${errors.nome ? styles.cadastroClienteInputErro : ""}`}
            />
            {errors.nome && <p className={styles.cadastroClienteErroTexto}>{errors.nome}</p>}
          </div>

          {/* CPF */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="cpf" className={styles.cadastroClienteLabel}>
              CPF *
            </label>
            <input
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              value={formData.cpf}
              onChange={handleInputChange}
              maxLength="14"
              className={`${styles.cadastroClienteInput} ${errors.cpf ? styles.cadastroClienteInputErro : ""}`}
            />
            {errors.cpf && <p className={styles.cadastroClienteErroTexto}>{errors.cpf}</p>}
          </div>

          {/* Data de Nascimento */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="dataDeNascimento" className={styles.cadastroClienteLabel}>
              Data de Nascimento *
            </label>
            <input
              type="date"
              id="dataDeNascimento"
              name="dataDeNascimento"
              value={formData.dataDeNascimento}
              onChange={handleInputChange}
              className={`${styles.cadastroClienteInput} ${
                errors.dataDeNascimento ? styles.cadastroClienteInputErro : ""
              }`}
            />
            {errors.dataDeNascimento && <p className={styles.cadastroClienteErroTexto}>{errors.dataDeNascimento}</p>}
          </div>

          {/* Telefone */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="telefone" className={styles.cadastroClienteLabel}>
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              maxLength="15"
              className={`${styles.cadastroClienteInput} ${errors.telefone ? styles.cadastroClienteInputErro : ""}`}
              placeholder="(11) 99999-9999"
            />
            {errors.telefone && <p className={styles.cadastroClienteErroTexto}>{errors.telefone}</p>}
          </div>

          {/* CEP */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="cep" className={styles.cadastroClienteLabel}>
              CEP *
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              maxLength="9"
              className={`${styles.cadastroClienteInput} ${errors.cep ? styles.cadastroClienteInputErro : ""}`}
              placeholder="00000-000"
            />
            {errors.cep && <p className={styles.cadastroClienteErroTexto}>{errors.cep}</p>}
          </div>

          {/* Número */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="numero" className={styles.cadastroClienteLabel}>
              Número *
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className={`${styles.cadastroClienteInput} ${errors.numero ? styles.cadastroClienteInputErro : ""}`}
              placeholder="123 ou S/N"
            />
            {errors.numero && <p className={styles.cadastroClienteErroTexto}>{errors.numero}</p>}
          </div>

          {/* Email */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="email" className={styles.cadastroClienteLabel}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.cadastroClienteInput} ${errors.email ? styles.cadastroClienteInputErro : ""}`}
              placeholder="seu@email.com"
            />
            {errors.email && <p className={styles.cadastroClienteErroTexto}>{errors.email}</p>}
          </div>

          {/* Senha */}
          <div className={styles.cadastroClienteCampoGrupo}>
            <label htmlFor="senha" className={styles.cadastroClienteLabel}>
              Senha *
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className={`${styles.cadastroClienteInput} ${errors.senha ? styles.cadastroClienteInputErro : ""}`}
              placeholder="Mínimo 8 caracteres"
            />
            {errors.senha && <p className={styles.cadastroClienteErroTexto}>{errors.senha}</p>}
            <p className={styles.cadastroClienteTextoAjuda}>
              Deve conter: letra maiúscula, número e caractere especial
            </p>
          </div>

          {/* Botão Submit */}
          <div className={styles.cadastroClienteBotaoContainer}>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`${styles.cadastroClienteBotaoSubmit} ${
                loading ? styles.cadastroClienteBotaoSubmitDesabilitado : ""
              }`}
            >
              {loading ? "Cadastrando..." : "Cadastrar Cliente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
