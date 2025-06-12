import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [formUsuario, setFormUsuario] = useState({
    email: "",
    password: "",
  });

  const [ehCliente, setEhCliente] = useState(null);
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

  async function cliente(token) {
    try {
      const response = await axios.get(
        `http://localhost:8080/login/ehCliente?token=${token}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          },
        }
      );
      setEhCliente(response.data);
      console.error("Chegou", response.data);
    } catch (error) {
      console.error("Erro ao verificar se é cliente:", error);
    }
  }

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/login?email=${formUsuario.email}&senha=${formUsuario.password}`, {}
      );
      const token = response.data;
      cliente(token);
      localStorage.setItem("token", token);
      alert("Login efetuado com sucesso!");
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao efetuar login!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await login();
      ehCliente ? navigate("/home") : navigate("/homeFuncionario");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Senha"
          onChange={handleInputChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
