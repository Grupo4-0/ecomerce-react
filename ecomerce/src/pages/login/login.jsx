import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import fofinho from "../../assets/fofinho.jpg";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { PawPrint } from "lucide-react";
import { AlertaSucesso } from "../../components/alert/AlertaSucesso";

export function Login() {
  const navigate = useNavigate();

  const [formUsuario, setFormUsuario] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formUsuario.email || !formUsuario.password) {
      setError("Por favor, preencha todos os campos");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formUsuario.email)) {
      setError("Por favor, insira um email válido");
      return false;
    }

    if (formUsuario.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return false;
    }

    return true;
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/login?email=${formUsuario.email}&senha=${formUsuario.password}`,
        {}
      );
      const token = response.data;
      localStorage.setItem("token", token);
      <AlertaSucesso mensagem="Bem-vindo de volta! 🐶 Estamos felizes em te ver!" />
      const isCliente = await cliente(token);
      return isCliente;
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao efetuar login!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  async function cliente(token) {
    try {
      const response = await axios.get(`http://localhost:8080/login/ehCliente?token=${token}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log("Chegou", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar se é cliente:", error);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const isCliente = await login(); 
      if (isCliente === true) {
        navigate("/");
      } else if (isCliente === false) {
        navigate("/funcionarioHome");
      } else {
        alert("Erro no redirecionamento!");
      }
    }
  };

  return (
    <div className={style.principal}>
      <div className={style.painelEsquerdo}>
        <header className={style.header}>
          <nav className={style.nav}>
            <ul className={style.navEsquerda}>
              <li className={style.comum}>
                <a href="/">Início</a>
              </li>
              <li className={style.comum}>
                <a href="/sobre">Sobre</a>
              </li>
            </ul>
            <ul className={style.navDireita}>
              <li className={style.cadastro}>
                <a href="/cliente/cadastro">Cadastre-se</a>
              </li>
            </ul>
          </nav>
        </header>

        <div className={style.dados}>
          <h2>Login</h2>
          <form className={style.inputSenha} onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder=" E-mail" onChange={handleInputChange} />
            <div className={style.inputSenha}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" Senha"
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={style.toggleSenha}>
                {showPassword ? <Eye size="20" color="#8F8F8F" /> : <EyeOff size="20" color="#8F8F8F" />}
              </button>
            </div>

            <button className={style.buttonEntrar} type="submit" disabled={loading}>
              {!loading && <PawPrint />}{" "}
              {loading ? (
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQ2dXN0MGg3cHBjMG94eGN2Mm1wbTJwOWE2c3ZzZTgybnNrNm85eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/OdawlEJW4LSX8t8TVW/giphy.gif"
                  width="20"
                />
              ) : (
                "Entrar"
              )}
            </button>

            {error && <p>{error}</p>}
          </form>
        </div>
      </div>

      <div className={style.painelDireito}>
        <h1 className={style.tituloImagem}>Wardiere</h1>
        <img src={fofinho} className={style.imagem} />
      </div>
    </div>
  );
}