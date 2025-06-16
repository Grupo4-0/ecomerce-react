import { useState } from "react";
import axios from "axios";
import styles from "./ButtonFinalizarCompra.module.css";

export function ButtonFinalizarCompra() {
  const token = localStorage.getItem("token");

  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [itensIndisponiveis, setItensIndisponiveis] = useState([]);
  const [endereco, setEndereco] = useState(null);
  const [isCarregando, setIsCarregando] = useState(false);

  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [mostrarItensIndisponiveis, setMostrarItensIndisponiveis] =
    useState(false);

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
    setIsCarregando(true);
    await finalizarPedido();
    setIsCarregando(false);
    setMostrarComprovante(true);
  };

  const handleClose = () => {
    setMostrarComprovante(false);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={styles.buttonFinalizar}
        disabled={isCarregando}
      >
        {!isCarregando && "Finalizar"}
        {isCarregando && (
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQ2dXN0MGg3cHBjMG94eGN2Mm1wbTJwOWE2c3ZzZTgybnNrNm85eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/OdawlEJW4LSX8t8TVW/giphy.gif"
            width="20"
            alt="Carregando..."
            style={{ marginLeft: "8px", verticalAlign: "middle" }}
          />
        )}
      </button>

      {mostrarComprovante &&
        (pedidoFinalizado && endereco ? (
          <div className={styles.comprovante}>
            <div className={styles.dadosPedido}>
              <p>
                <strong>Código do pedido: </strong> {pedidoFinalizado.codigo}
              </p>
              <p>
                <strong>Nome: </strong> {pedidoFinalizado.nome}
              </p>

              <h2>Produtos adquiridos:</h2>
              <ul className={styles.listaItens}>
                {itensPedido.map((item) => (
                  <li key={item.codigo} className={styles.item}>
                    <p>
                      <strong>Código: </strong> {item.codigoProduto}
                    </p>
                    <p>
                      <strong>Produto: </strong> {item.nome}
                    </p>
                    <p>
                      <strong>Preço: </strong> R$ {item.precoUnitario}
                    </p>
                    <p>
                      <strong>Quantidade: </strong> {item.quantidade}
                    </p>
                    <p>
                      <strong>Subtotal: </strong> {item.precoTotal}
                    </p>
                  </li>
                ))}
              </ul>

              {mostrarItensIndisponiveis && (
                <div className={styles.itensIndisponiveis}>
                  <h2>Produtos sem estoque:</h2>
                  <p>
                    Alguns dos produtos selecionados ficaram sem estoque durante
                    o processo de compra. Por isso, listamos abaixo os itens
                    que, infelizmente, não puderam ser adquiridos.
                  </p>

                  <ul className={styles.listaIndisponiveis}>
                    {itensIndisponiveis.map((item) => (
                      <li key={item.codigo}>
                        <p>
                          <strong>Produto: </strong> {item.nome}
                        </p>
                        <p>
                          <strong>Quantidade: </strong> {item.quantidadeFaltante}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p>
                <strong>Data da compra:</strong>{" "}
                {pedidoFinalizado.dataDeFinalizacao}
              </p>
              <p>
                <strong>Endereço para entrega: </strong> {endereco.rua},{" "}
                {endereco.numero}, {endereco.bairro}, {endereco.cidade},{" "}
                {endereco.estado}, {endereco.cep}
              </p>
              <p>
                <strong>Frete:</strong> {pedidoFinalizado.valorFrete}
              </p>
              <p>
                <strong>Total:</strong> {pedidoFinalizado.precoTotal}
              </p>
            </div>
            <button onClick={handleClose}>Fechar</button>
          </div>
        ) : (
          <p>Carregando pedido...</p>
        ))}
    </>
  );
}
