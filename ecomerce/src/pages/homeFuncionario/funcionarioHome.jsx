import { useNavigate } from "react-router-dom";
import styles from "./homeF.module.css"

export function FuncionarioHome() {
    const navigate = useNavigate()
    //add botao para mandar para a home principal
    return (
        <div className={styles.conteudo}>
            <h1> Bem vindo(a)!</h1>
            <div >
                <h1>Painel do Funcionário</h1>
                <p>Gerencie os produtos e categorias aqui.</p>
                <h2> O que voce deseja cadastrar? </h2>
                <div className={styles.botoes}>
                    <button onClick={() => navigate("/cadastro-categoria")}>
                        Categoria
                    </button>
                    <button onClick={() => navigate("/cadastro-produto")}>
                        Produto
                    </button>
                </div>
            </div>

        </div>
    )

}