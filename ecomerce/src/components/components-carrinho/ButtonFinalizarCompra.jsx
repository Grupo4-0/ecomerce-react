import { useState } from "react";
import axios from "axios";

export function ButtonFinalizarCompra() {
  const token = localStorage.getItem("token");

  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [itensIndisponiveis, setItensIndisponiveis] = useState([]);
  const [endereco, setEndereco] = useState(null);

  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [mostrarItensIndisponiveis, setMostrarItensIndisponiveis] = useState(false);

  const verificarItensIndisponiveis = (itens) => {
    setMostrarItensIndisponiveis(itens && itens.length > 0);
  };

  const finalizarPedido = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pedidos/finalizar",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pedido = response.data;

      setPedidoFinalizado(pedido);
      setItensPedido(pedido.itens || []);
      setItensIndisponiveis(pedido.itensIndisponiveis || []);
      setEndereco(pedido.enderecoEntrega);
      verificarItensIndisponiveis(pedido.itensIndisponiveis);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao finalizar pedido!");
    }
  };

  const handleClick = async () => {
    await finalizarPedido();
    setMostrarComprovante(true);
  };

  const handleClose = () => {
    setMostrarComprovante(false);
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleClick}>
        <p>Finalizar</p>
      </button>

      {mostrarComprovante && (
        pedidoFinalizado && endereco ? (
          <div id="comprovante">
            <div id="dadosPedido">
              <p>Código do pedido: {pedidoFinalizado.codigo}</p>
              <p>Nome: {pedidoFinalizado.nome}</p>

              <h2>Produtos adquiridos:</h2>
              <ul>
                {itensPedido.map((item) => (
                  <li key={item.codigo}>
                    <p>Código: {item.codigoProduto}</p>
                    <p>Produto: {item.nome}</p>
                    <p>Preço: R$ {item.precoUnitario}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Subtotal: {item.precoTotal}</p>
                  </li>
                ))}
              </ul>

              {mostrarItensIndisponiveis && (
                <div id="itensIndisponiveis">
                  <h2>Produtos sem estoque:</h2>
                  <p>
                    Alguns dos produtos selecionados ficaram sem estoque durante o
                    processo de compra. Por isso, listamos abaixo os itens que,
                    infelizmente, não puderam ser adquiridos.
                  </p>

                  <ul>
                    {itensIndisponiveis.map((item) => (
                      <li key={item.codigo}>
                        <p>Produto: {item.nome}</p>
                        <p>Quantidade: {item.quantidadeFaltante}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p>Data da compra: {pedidoFinalizado.dataDeFinalizacao}</p>
              <p>
                Endereço pra entrega: {endereco.rua}, {endereco.numero},{" "}
                {endereco.bairro}, {endereco.cidade}, {endereco.estado},{" "}
                {endereco.cep}
              </p>
              <p>Frete: {pedidoFinalizado.valorFrete}</p>
              <p>Total: {pedidoFinalizado.precoTotal}</p>
            </div>
            <button onClick={handleClose}>Fechar</button>
          </div>
        ) : (
          <p>Carregando pedido...</p>
        )
      )}
    </>
  );
}
