import { useState, useEffect } from "react";
import { ButtonUsuario } from "./ButtonUsuario";
import axios from "axios";
import style from "./StyleButton.module.css";

export function ButtonEscolher() {
  const [logado, setLogado] = useState(false);
  const [existe, setExiste] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setExiste(false);
        setLogado(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/login/tokenValido/${token}`
        );
        setExiste(true);
        setLogado(response.data);
      } catch (error) {
        setLogado(false);
      }
    };

    verificarToken();
    const interval = setInterval(verificarToken, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {logado ? (
        <ButtonUsuario />
      ) : existe ? (
        <a href="/login" className={style.ButtonNav}>Login</a>
      ) : (
        <a href="/cliente/cadastro" className={style.ButtonNav}>Cadastrar-se</a>
      )}
    </div>
  );
}
