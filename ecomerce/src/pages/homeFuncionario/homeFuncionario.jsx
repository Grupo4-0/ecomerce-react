import { useNavigate } from "react-router-dom";
import styles from "./homeF.module.css"

export function HomeFuncionario() {
    const navigate = useNavigate()
    //add botao para mandar para a home principal
    return (
        <div className={styles.conteudo}>
            <button onClick={() => navigate(-1)} className={styles.voltar}>
                &larr; Voltar
            </button>
            <h1>Painel do Funcionário</h1>
            <div >
                <h1> Bem vindo(a)!</h1>
                <p>Gerencie os produtos e categorias aqui.</p>
                <h2> O que voce deseja cadastrar? </h2>
                <div className={styles.botoes}>
                    <button onClick={() => navigate("/cadastro-categoria")}>
                        Nova Categoria
                    </button>
                    <button onClick={() => navigate("/cadastro-produto")}>
                        Novo Produto
                    </button>
                </div>
            </div>
        </div>
    )

}