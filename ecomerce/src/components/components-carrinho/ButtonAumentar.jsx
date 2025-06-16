import axios from "axios";
import { Plus } from "lucide-react";

export function ButtonAumentar({ itemId }) {
  const token = localStorage.getItem("token");

  const aumentar = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/pedidos/aumentar/${itemId}`, null, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      return true;
    } catch (error) {
      alert("Não foi possível aumentar a quantidade!");
      return false;
    }
  };

  const handleClick = async () => {
    aumentar();
  };

  return (
    <button onClick={handleClick}>
      <Plus size="18" />
    </button>
  );
}
