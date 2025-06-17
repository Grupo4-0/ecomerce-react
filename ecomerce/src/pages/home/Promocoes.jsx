import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card/card";
import { Navbar } from "../../components/Navbar/navbar";
import styles from "./Promocoes.module.css";

export function Promocoes() {
  const { nome } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/produtos/promocoes`)
      .then((res) => setProdutos(res.data))
      .catch((err) => {
        console.error(err);
        setProdutos([]);
      })
      .finally(() => setLoading(false));
  }, [nome]);

  if (loading) {
    return (
      <div className={styles.mensagemVazia}>
        <p>Carregando produtos na promoção...</p>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className={styles.mensagemVazia}>
        <p>Ainda não há nenhum produto na promoção!!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardWrapper}>
        <div className={styles.titulo}>
        <h1 className={styles.titulo}>Promoções</h1>
        <p style={{ fontFamily: 'Poppins', color: 'var(--cor-subtitulo)', fontSize:'20px'}}>
          ({produtos.length})
        </p>
        </div>
        <ul className={styles.listaCards}>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <Card
                idProduto={produto.id}
                nome={produto.nome}
                descricao={produto.descricao}
                idCategoria={produto.idCategoria}
                preco={produto.preco}
                precoPromocional={produto.precoPromocional}
                estoque={produto.estoque}
                fabricante={produto.fabricante}
                className={styles.cardAtual}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}