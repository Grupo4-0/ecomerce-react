import React from "react";
import "../../App.css";
import ProfileFlipCard from "../../Pages/ProfileFlip/ProfileFlipCard";
import imgMaria from "../../assets/MariaAraguao.png";
import imgJose from "../../assets/JoseNetto.png";
import imgLivia from "../../assets/Livia.png";
import imgNathan from "../../assets/NathanGomes.png";
import imgThais from "../../assets/Thais.png";
import imgPaulo from "../../assets/PauloRicardo.png";

function About() {
  return (
    <div className="edu-font">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Sobre a Equipe</h1>
      <div className="grid-container">
        <ProfileFlipCard
          image={imgMaria}
          name="Maria Araguão"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/Maria-S-Aragao"
        />
        <ProfileFlipCard
          image={imgJose}
          name="José Netto"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/jcboaretto1"
        />
        <ProfileFlipCard
          image={imgLivia}
          name="Lívia Raissiger"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/Livia9"
        />
        <ProfileFlipCard
          image={imgNathan}
          name="Nathan Gomes"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/NathandGomes"
        />
        <ProfileFlipCard
          image={imgThais}
          name="Thais Costa"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/tatacost"
        />
        <ProfileFlipCard
          image={imgPaulo}
          name="Paulo Ricardo"
          quote="Mensagem Inspiradora "
          description=" Sua descrição "
          githubLink="https://github.com/pauloricardoc"
        />
      </div>
    </div>
  );
}

export default About;
