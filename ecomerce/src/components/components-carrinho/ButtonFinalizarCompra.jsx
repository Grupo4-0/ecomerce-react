import { useState } from "react";
import axios from "axios";
import styles from "./ButtonFinalizarCompra.module.css";

export function ButtonFinalizarCompra({ onFinalize }) {
  const token = localStorage.getItem("token");

  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [itensIndisponiveis, setItensIndisponiveis] = useState([]);
  const [endereco, setEndereco] = useState(null);
  const [isCarregando, setIsCarregando] = useState(false);
  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [mostrarItensIndisponiveis, setMostrarItensIndisponiveis] = useState(false);

  const finalizarPedido = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pedidos/finalizar",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const pedido = response.data;
      setPedidoFinalizado(pedido);
      setItensPedido(pedido.itens || []);
      setItensIndisponiveis(pedido.itensIndisponiveis || []);
      setEndereco(pedido.enderecoEntrega);
      setMostrarItensIndisponiveis((pedido.itensIndisponiveis || []).length > 0);
      setMostrarComprovante(true);
      // Notifica o componente pai que o pedido foi finalizado
      if (onFinalize) onFinalize(pedido);
    } catch (error) {
      alert("Erro ao finalizar pedido!");
      console.error(error);
    }
  };

  const handleClick = () => {
    setIsCarregando(true);
    finalizarPedido().finally(() => setIsCarregando(false));
  };

  const handleClose = () => {
    setMostrarComprovante(false);
    // Em vez de reload, chama callback para limpar carrinho no componente pai
    if (onFinalize) onFinalize(null);
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
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQ2dXN0MGg3cHBjMG94eGN2Mm1wbTJwOWE2c3ZzZTgybnNrNm85eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q/OdawlEJW4LSX8t8TVW/giphy.gif"
            width="20"
            alt="Carregando..."
            style={{ marginLeft: "8px", verticalAlign: "middle" }}
          />
        )}
      </button>

      {mostrarComprovante && (
        pedidoFinalizado && endereco ? (
          <div className={styles.comprovante}>
            {/* ... estrutura do comprovante ... */}
            <button onClick={handleClose}>Fechar</button>
          </div>
        ) : (
          <p>Carregando pedido...</p>
        )
      )}
    </>
  );
}
