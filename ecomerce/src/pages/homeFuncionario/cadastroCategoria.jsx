import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categoriasExistentes, setCategoriasExistentes] = useState([]);

  //puxo as categorias que ja estao no meu banco p tratar caso o funcionario digite uma categoria q ja existe
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategoriasExistentes(response.data);
      } catch (err) {
        console.error("Erro ao carregar categorias! Erro:", err);
      }
    };

    fetchCategorias();
  }, []);

  //msg p quando o input for enviado vazio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nome.trim()) {
      setError("O nome da categoria é obrigatório!");
      return;
    }
    //***pensar se coloco apenas o required ou mensagem personalizada

    // Verifica se a categoria já existe
    if (
      categoriasExistentes.some(
        (c) => c.nome.toLowerCase() === nome.trim().toLowerCase()
      )
    ) {
      setError("Categoria já existente.");
      return;
    }
    //Não permite numeros
    if (/\d/.test(nome)) {
      setError("Retire os números do nome da categoria.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/categorias",
        { nome },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //categoria cadastrada, uso o navigate para mandar de volta para a home
      alert("Categoria cadastrada com sucesso!");
      setCategoriasExistentes([...categoriasExistentes, { nome }]);
      setNome("");
      navigate("/homeFuncionario");

    } catch (err) {
      console.error("Erro ao cadastrar categoria:", err);
      if (err.response?.status === 400 || err.response?.status === 409) {
        setError("Categoria já existe ou dados inválidos.");
      } else if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        setError("Acesso negado. Faça login novamente.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cadastro de Categoria</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome da categoria</label>
        <input
          id="nome"
          type="text"
          placeholder="Nome da categoria"
          name="nome"
          value={nome}
          onChange={(e) => {
            const valor = e.target.value;
            setNome(valor);

            // Verifica se tem algum número no nome da categoria
            if (/\d/.test(valor)) {
              setError("Não é permitido números no nome da categoria.");
            } else {
              setError("");
            }
          }} />

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}
