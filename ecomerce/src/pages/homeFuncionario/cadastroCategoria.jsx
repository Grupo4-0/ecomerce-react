import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./cadastroCategoria.module.css"
import fofinho from "../../assets/fofinho.jpg"

export function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categoriasExistentes, setCategoriasExistentes] = useState([]);

  //puxo as categorias que ja estao no meu banco p tratar caso o funcionario digite uma categoria já existente
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

    // Verifica se a categoria já existe
    if (categoriasExistentes.some((c) => c.nome.toLowerCase() === nome.trim().toLowerCase())) {
      setError("Categoria já existente.");
      return;
    }
    //Não permite numeros caso o funcionario envie com eles irá receber essa mensagem
    if (/\d/.test(nome)) {
      setError("Retire os números do nome da categoria.");
      return;
    }

    setLoading(true);

    //adiçao de nova categoria
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
      navigate("/funcionarioHome");
    } catch (err) {
      console.error("Erro ao cadastrar categoria:", err);
      if (err.response?.status === 400 || err.response?.status === 409) {
        setError("Categoria já existe ou dados inválidos.");
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Acesso negado. Faça login novamente.");
      } else {
        setError("Erro inesperado :( Por favor, tente novamente!");
      }
    } finally {
      setLoading(false);
    }
  };
  //body
  return (
    <div className={styles.principal}>
      <div className={styles.painelEsquerdo}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.voltar}>
            &larr; Voltar
          </button>
        </div>

        <div className={styles.dados}>
          <h2>Cadastro de Categoria</h2>

          <form className={styles.formCadastro} onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome da categoria</label>
            <input
              className={styles.inputCategoria}
              id="nome"
              type="text"
              placeholder="Nome da categoria"
              name="nome"
              value={nome}
              onChange={(e) => {
                const valor = e.target.value;
                setNome(valor);

                if (/\d/.test(valor)) {
                  setError("Não é permitido números no nome da categoria.");
                } else {
                  setError("");
                }
              }}
            />

            <button type="submit" className={styles.botaoEnviar} disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          </form>
        </div>
      </div>

      <div className={styles.painelDireito}>
        <div>
          <h1 className={styles.tituloImagem}>Wardiere</h1>
          <img src={fofinho} className={styles.imagem} alt="Identidade visual do site que é um gato deitado na grama" />
        </div>
      </div>
    </div>
  );
}
