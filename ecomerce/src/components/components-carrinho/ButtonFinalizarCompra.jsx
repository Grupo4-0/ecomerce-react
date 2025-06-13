import { useState } from "react";

export function ButtonFinalizarCompra() {
  const token = localStorage.getItem("token");

  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [itensPedido, setItensPedido] = useState(null);
  const [itensIndisponiveis, setItensIndisponiveis] = useState(null);

  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [mostrarItensIndisponiveis, setMostrarItensIndisponiveis] = useState (false);


    const existeItensIndisponiveis = async () => {

    }

  const finalizarPedido = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pedidos/finalizar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pedido = response.data;

      setPedidoFinalizado(pedido);
      setItensPedido(pedido.itens);
      setItensIndisponiveis(pedido.itensIndisponiveis);
      existeItensIndisponiveis();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao finalizar pedido!");
    }
  };

  const handleClick = async () => {
    finalizarPedido();
    setMostrarComprovante(true);
  };

  const handleClose = async () => {
    setMostrarComprovante(false);
  };

  return (
    <>
      <button onClick={handleClick}>
        <p>Finalizar</p>
      </button>

      {mostrarComprovante && (
        <div id="comprovante">
            <h3>Nome: {pedidoFinalizado.nome}</h3>


        </div>
      )}
    </>
  );
}
