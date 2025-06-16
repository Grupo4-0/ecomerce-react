import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card/card";
import { Navbar } from "../../components/Navbar/navbar";
import styles from './ListaRecomendacoes.module.css';
import { useRef } from "react";

export function ListaRecomendacoes() {
  const { nome } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const [podeRolarEsquerda, setPodeRolarEsquerda] = useState(false);
  const [podeRolarDireita, setPodeRolarDireita] = useState(false);
  const listaRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/produtos`)
      .then((res) => {
        const embaralhados = res.data.sort(() => Math.random() - 0.5);
        setProdutos(embaralhados.slice(0, 10)); // no máximo 10
      })
      .catch((err) => {
        console.error(err);
        setProdutos([]);
      })
      .finally(() => setLoading(false));
  }, [nome]);

  // Verifica se precisa mostrar os botões de navegação
  useEffect(() => {
    const verificarScroll = () => {
      if (listaRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listaRef.current;
        const precisaScroll = scrollWidth > clientWidth;
        
        setMostrarBotoes(precisaScroll);
        setPodeRolarEsquerda(scrollLeft > 0);
        setPodeRolarDireita(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    verificarScroll();
    
    // Adiciona listener para mudanças de tamanho da janela
    window.addEventListener('resize', verificarScroll);
    
    // Adiciona listener para scroll da lista
    if (listaRef.current) {
      listaRef.current.addEventListener('scroll', verificarScroll);
    }

    return () => {
      window.removeEventListener('resize', verificarScroll);
      if (listaRef.current) {
        listaRef.current.removeEventListener('scroll', verificarScroll);
      }
    };
  }, [produtos]);

  const rolarParaEsquerda = () => {
    listaRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const rolarParaDireita = () => {
    listaRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

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
          <h1>Favoritos</h1>
        </div>

        <div className={styles.carouselContainer}>
          <ul className={styles.listaCards} ref={listaRef}>
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

          {mostrarBotoes && (
            <>
              {podeRolarEsquerda && (
                <button 
                  onClick={rolarParaEsquerda} 
                  className={`${styles.botaoNav} ${styles.botaoEsquerda}`}
                  aria-label="Rolar para esquerda"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              
              {podeRolarDireita && (
                <button 
                  onClick={rolarParaDireita} 
                  className={`${styles.botaoNav} ${styles.botaoDireita}`}
                  aria-label="Rolar para direita"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}