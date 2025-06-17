import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ButtonRemover } from "../../components/components-carrinho/ButtonRemover";
import { ButtonAumentar } from "../../components/components-carrinho/ButtonAumentar";
import { ButtonDiminuir } from "../../components/components-carrinho/ButtonDiminuir";
import { ButtonFinalizarCompra } from "../../components/components-carrinho/ButtonFinalizarCompra";
import style from "./carrinho.module.css";
import { Navbar } from "../../components/Navbar/navbar";

export function Carrinho() {
  const navigate = useNavigate();

  const [pedidoAtual, setPedidoAtual] = useState(null);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const buscarPedido = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pedidos/atual",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pedidos = response.data;
        const pedido = pedidos[0];

        setPedidoAtual(pedido);
        setItens(pedido.itens || []);
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      }
    };

    buscarPedido();
  }, [navigate]);

  const carrinhoVazio = !pedidoAtual || itens.length === 0;

  return (
    <div className={style.container}>
      <header>
        <Navbar />
      </header>

      <h1 className={style.titulo}>Carrinho</h1>
      <div className={style.pedidoAtual}>
        {!carrinhoVazio ? (
          <div>
            <div className={style.dadosPedido}>
              <h2>Código do Pedido #{pedidoAtual.codigo}</h2>
              <ul className={style.listaItens}>
                {itens.map((item) => (
                  <li key={item.codigo} className={style.item}>
                    <p>
                      <strong>{item.nome}</strong>
                    </p>
                    <p>Preço: R${item.precoUnitario}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Total: R${item.precoTotal}</p>
                    <div className={style.controles}>
                      <ButtonAumentar itemId={item.codigo} />
                      <ButtonDiminuir itemId={item.codigo} />
                      <ButtonRemover idProduto={item.codigoProduto} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className={style.totais}>
                <h3>Frete: R${pedidoAtual.valorFrete}</h3>
                <h3>Total: R${pedidoAtual.precoTotal}</h3>
              </div>
            </div>
            <ButtonFinalizarCompra />
          </div>
        ) : (
          <div className={style.carrinhoVazio}>
            <h2>Nada por aqui ainda...</h2>
            <p>Seu melhor amigo tá esperando por aquele agrado especial!</p>
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGoyZGpmb3Zzenk0MzhwNGJqZWY2amthNjFmaTRocXNyNmpydjR6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kTHH8wDg1Cmcw/giphy.gif"
              alt="Gif fofo de carrinho vazio"
              width="200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
