import { useState } from "react";
import "../../pages/sobre/sobre.module.css";
import ProfileFlipCard from "../../components/ProfileFlipCard/ProfileFlipCard";
import imgMaria from "../../assets/MariaAraguao.png";
import imgJose from "../../assets/JoseNetto.png";
import imgLivia from "../../assets/Livia.png";
import imgNathan from "../../assets/NathanGomes.png";
import imgThais from "../../assets/Thais.png";
import imgPaulo from "../../assets/PauloRicardo.png";

function Sobre() {
  return (
    <div className="poppins-regular-italic ">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Sobre a Equipe</h1>
      <div className="grid-container-sobre">
        <ProfileFlipCard
          image={imgMaria}
          name="Maria Araguão"
          quote="Eu não falhei. Apenas descobri 10.000 maneiras que não funcionam."
          description=" Tenh"
          githubLink="https://github.com/Maria-S-Aragao"
        />
        <ProfileFlipCard
          image={imgJose}
          name="José Netto"
          quote="Todo programador já se sentiu perdido. A diferença está em quem decide continuar. "
          description=" Sua descrição "
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
          quote="Cada linha que você escreve te aproxima do programador que você quer ser."
          description=" Sua descrição "
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
          description=" Sua descrição "
          githubLink="https://github.com/pauloricardoc"
        />
      </div>
    </div>
  );
}

export default Sobre;
