import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ButtonListaCategorias.module.css";
import { Link } from "react-router-dom";

export function ButtonListaCategorias() {
  const [mostrar, setMostrar] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const buscarCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setMostrar(true)}
      onMouseLeave={() => setMostrar(false)}
    >
      <button className={styles.botao}>Categoria</button>

      {mostrar && (
        <div className={styles.dropdown}>
          {categorias.map((categoria) => (
            <Link key={categoria.id} to={`/categoria/${categoria.nome}`}>
              <button className={styles.item}>{categoria.nome}</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
