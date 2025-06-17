import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Card } from "../Card/card";
import style from "./ButtonPesquisar.module.css";

export function ButtonPesquisar() {
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  const handleChange = async (event) => {
    const value = event.target.value;
    setBusca(value);

    if (value.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/produtos/pesquisa/${value}`
        );
        setProdutos(response.data);
        setMostrarProdutos(true);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    } else {
      setProdutos([]);
      setMostrarProdutos(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.searchWrapper}>
        <Search size="20" className={style.searchBar}/>
        <input
          type="text"
          value={busca}
          onChange={handleChange}
          placeholder="Pesquisar..."
          className={style.inputBusca}
        />
      </div>

      {mostrarProdutos && (
        <div className={style.resultadoContainer}>
          
          {produtos.length === 0 ? (
            <div className={style.mensagemVazia}>
              Nenhum produto encontrado.
            </div>
          ) : (
            <div className={style.listaCards}>
              {produtos.map((produto) => (
                <div key={produto.id} className={style.cardWrapper}>
                  <Card
                    idProduto={produto.id}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    idCategoria={produto.idCategoria}
                    preco={produto.preco}
                    precoPromocional={produto.precoPromocional}
                    estoque={produto.estoque}
                    fabricante={produto.fabricante}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}