import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import style from "./StyleButton.module.css";
import styles from "./StyleButton.module.css";

export function ButtonUsuario() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const verificarSeEhCliente = async (token) => {
    if (!token) return null;

    try {
      const response = await axios.get(
        `http://localhost:8080/login/ehCliente?token=${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data === true;
    } catch (error) {
      console.error("Erro ao verificar se é cliente:", error);
      return null;
    }
  };

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      navigate("/login");
      return;
    }

    setCarregando(true);
    const ehCliente = await verificarSeEhCliente(token);
    setCarregando(false);

    if (ehCliente === true) {
      navigate("/");
    } else if (ehCliente === false) {
      navigate("/funcionarioHome");
    } else {
      alert("Erro ao redirecionar usuário.");
    }
  };

  return (
    <button onClick={handleClick} disabled={carregando} className={style.ButtonNav}>
      {carregando ? "Verificando..." : "Usuário"}
    </button>
  );
}
