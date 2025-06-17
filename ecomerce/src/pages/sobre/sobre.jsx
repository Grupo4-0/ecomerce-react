import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/sobre/sobre.module.css";
import ProfileFlipCard from "../../components/ProfileFlipCard/ProfileFlipCard";
import imgMaria from "../../assets/MariaAraguao.png";
import imgJose from "../../assets/JoseNetto.png";
import imgLivia from "../../assets/Livia.png";
import imgNathan from "../../assets/NathanGomes.png";
import imgThais from "../../assets/Thais.png";
import imgPaulo from "../../assets/PauloRicardo.png";
import { Navbar } from "../../components/Navbar/navbar";

function Sobre() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.divSobre}>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Sobre a Equipe</h1>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#ff9ac1",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Voltar para Home
          </button>
        </div>

        <div className={styles.gridSobre}>
          <ProfileFlipCard
            image={imgMaria}
            name="Maria Araguão"
            quote="Eu não falhei. Apenas descobri 10.000 maneiras que não funcionam."
            description="Estou sempre estudando, testando novas tecnologias e buscando escrever um backend cada vez mais inteligente, escalável e sustentável. Se tiver lógica envolvida, estou dentro. Se for pra resolver um bug desafiador, melhor ainda. "
            githubLink="https://github.com/Maria-S-Aragao"
          />
          <ProfileFlipCard
            image={imgJose}
            name="José Netto"
            quote="Todo programador já se sentiu perdido. A diferença está em quem decide continuar. "
            description="Sou uma pessoa colaborativa, paciente e que valoriza o trabalho em equipe. Tenho interesse em atuar na área de tecnologia, com foco em backend Java. Gosto de ambientes leves e estou sempre disposto a contribuir, aprender e crescer junto com o time."
            githubLink="https://github.com/jcboaretto1"
          />
          <ProfileFlipCard
            image={imgLivia}
            name="Lívia Raissiger"
            quote="Grandes sistemas começam com pequenos comandos. Continue codando. "
            description=" Sou apaixonada pela área da tecnologia e, no momento, tenho mais interesse em front-end. Tenho facilidade para trabalhar em equipe, sou organizada, dedicada e estou sempre em busca de aprendizado para evoluir tecnicamente. "
            githubLink="https://github.com/Livia9"
          />
          <ProfileFlipCard
            image={imgNathan}
            name="Nathan Gomes"
            quote="Transformo café em código e ideias em soluções."
            description=" Trabalho com foco em eficiência, segurança e clareza no código. Curto resolver problemas complexos, otimizar processos e construir soluções sólidas, pensando sempre na escalabilidade e na manutenção a longo prazo. "
            githubLink="https://github.com/NathandGomes"
          />
          <ProfileFlipCard
            image={imgThais}
            name="Thais Costa"
            quote="Vocês tem sorte de Não torcer para o Vasco."
            description=" Tenho 22 anos, sou estudante de Software e apaixonada por tecnologia. Acredito que a programação é uma ferramenta poderosa para transformar o mundo."
            githubLink="https://github.com/tatacost"
          />
          <ProfileFlipCard
            image={imgPaulo}
            name="Paulo Ricardo"
            quote="Errar faz parte do código. Cada bug é um passo a mais rumo à maestria."
            description=" Sou movido a desafios. Gosto de pegar problemas complexos, quebrar em partes e construir soluções inteligentes e eficientes. Trabalhar com lógica, segurança, performance e escalabilidade não só me motiva, como me diverte. "
            githubLink="https://github.com/pauloricardoc"
          />
        </div>
      </div>
    </>
  );
}

export default Sobre;
