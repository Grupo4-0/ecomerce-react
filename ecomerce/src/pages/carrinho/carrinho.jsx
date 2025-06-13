import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ButtonRemover } from "../../components/components-carrinho/ButtonRemover";
import { ButtonAumentar } from "../../components/components-carrinho/ButtonAumentar";

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
        alert("Erro ao buscar pedido!");
      }
    };

    buscarPedido();
  }, [navigate]);

  return (
    <div id="principal">
      <h1>Carrinho</h1>
      <div id="pedidoAtual">
        {pedidoAtual ? (
          <div>
            <h2>Pedido #{pedidoAtual.codigo}</h2>
            <ul>
              {itens.map((item) => (
                <li key={item.codigo}>
                  <p>{item.nome}</p>
                  <p>Preço: R${item.precoUnitario}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Total: R${item.precoTotal}</p>
                  <ButtonAumentar itemId={item.codigo} />
                  <ButtonRemover idProduto={item.codigoProduto} />
                </li>
              ))}
            </ul>
            <div id="dadosPedido">
              <h3></h3>
            </div>
          </div>
        ) : (
          <p>Carregando pedido...</p>
        )}
      </div>
    </div>
  );
}
