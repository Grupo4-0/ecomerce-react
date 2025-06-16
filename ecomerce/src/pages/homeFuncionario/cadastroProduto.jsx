import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastroProduto.module.css"
import fofinho from "../../assets/fofinho.jpg"

export function CadastroProduto() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [produto, setProduto] = useState({
        nome: "",
        descricao: "",
        idCategoria: "",
        preco: "",
        precoPromocional: "",
        estoque: "",
        fabricante: "",
        foto: null,
    });

    // Busca categorias da API para retornar ao funcionario
    useEffect(() => {
        async function buscarCategorias() {
            try {
                const response = await axios.get("http://localhost:8080/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias! Erro:", error);
            }
        }
        buscarCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!produto.idCategoria) {
            setError("Selecione uma categoria");
            setLoading(false);
            return;
        }

        const produtoObj = {
            nome: produto.nome.trim(),
            descricao: produto.descricao.trim(),
            idCategoria: Number(produto.idCategoria),
            preco: parseFloat(produto.preco),
            precoPromocional: produto.precoPromocional ? parseFloat(produto.precoPromocional) : null,
            estoque: parseInt(produto.estoque),
            fabricante: produto.fabricante.trim(),
        };

        const formData = new FormData();
        formData.append(
            "produto",
            new Blob([JSON.stringify(produtoObj)], { type: "application/json" })
        );

        if (produto.foto) {
            formData.append("foto", produto.foto);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/produtos", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Produto cadastrado com sucesso!");
            navigate("/funcionarioHome");
        } catch (error) {
            setError("Erro ao cadastrar produto. Verifique se todos os campos estão preenchidos corretamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.principal}>
            <div className={styles.painelEsquerdo}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.voltar}>
                        &larr; Voltar </button>
                </div>
                <div className={styles.dados}>
                    <h2 className={styles.titulo}>Cadastro de Produto</h2>
                    <form onSubmit={handleSubmit} className={styles.formCadastro} encType="multipart/form-data">
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                className={styles.inputProduto}
                                value={produto.nome}
                                onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Descrição</label>
                            <textarea
                                className={styles.inputProduto}
                                value={produto.descricao}
                                onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
                            />
                        </div>

                        <div>
                            <label>Categoria</label>
                            <select
                                className={styles.inputProduto}
                                value={produto.idCategoria}
                                onChange={(e) => setProduto({ ...produto, idCategoria: e.target.value })} >
                                <option value="">Selecione uma categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Preço</label>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.inputProduto}
                                value={produto.preco}
                                onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
                                required
                                min="0" />
                        </div>
                        <div>
                            {/* nao obrigatorio */}
                            <label>Preço Promocional</label>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.inputProduto}
                                value={produto.precoPromocional}
                                onChange={(e) => setProduto({ ...produto, precoPromocional: e.target.value })}
                                min="0"
                            />
                        </div>

                        <div>
                            <label>Estoque</label>
                            <input
                                type="number"
                                className={styles.inputProduto}
                                value={produto.estoque}
                                onChange={(e) => setProduto({ ...produto, estoque: e.target.value })}
                                required
                                min="0"
                            />
                        </div>

                        <div>
                            <label>Fabricante</label>
                            <input
                                type="text"
                                className={styles.inputProduto}
                                value={produto.fabricante}
                                onChange={(e) => setProduto({ ...produto, fabricante: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Foto do Produto</label>
                            <input
                                type="file"
                                className={styles.inputProduto}
                                accept="image/*"
                                required
                                onChange={(e) => setProduto({ ...produto, foto: e.target.files[0] })}
                            />
                        </div>

                        <button type="submit" className={styles.botaoEnviar} disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                    </form>
                </div>
            </div>

            <div className={styles.painelDireito}>
                <h1 className={styles.tituloImagem}>Wardiere</h1>
                <img src={fofinho} className={styles.imagem} alt="Identidade visual do site que é um gato deitado na grama" />
            </div>
        </div>
    );
}
