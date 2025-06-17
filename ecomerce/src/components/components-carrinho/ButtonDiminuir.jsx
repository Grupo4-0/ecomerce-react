import axios from "axios";
import { Minus } from "lucide-react";

export function ButtonDiminuir({ itemId }) {
  const token = localStorage.getItem("token");

  const diminuir = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/pedidos/diminuir/${itemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return true;
    } catch (error) {
      alert("Não foi possível diminuir a quantidade!");
      return false;
    }
  };

  const handleClick = async () => {
    diminuir();
  };

  return (
    <button onClick={handleClick}>
      <Minus size="18" />
    </button>
  );
}
