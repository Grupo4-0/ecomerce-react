import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./ProfileFlipCard.module.css";

const ProfileFlipCard = ({ image, name, quote, description, githubLink }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={styles.flipCard} onClick={handleClick}>
      <div className={`${styles.flipCardInner} ${flipped ? styles.flipped : ""}`}>
        <div className={styles.flipCardFront}>
          <img src={image} alt={name} className={styles.profileImage} />

          <h2>{name}</h2>
          <p>{quote}</p>
        </div>
        <div className={styles.flipCardBack}>
          <h3>Sobre mim</h3>
          <p>{description}</p>
          <div className={styles.socialIcons}>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <FaGithub size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFlipCard;
