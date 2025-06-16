import React, { useState, useEffect } from 'react';
import styles from './BannerCarousel.module.css';

export function BannerCarousel() {
  const banners = [
    "/PetBanner1.png",
    "/PetBanner5.png", 
    "/PetBanner6.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    console.warn(`Erro ao carregar imagem: ${banners[index]}`);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Container das imagens */}
      <div className={styles.carouselWrapper}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img 
                src={banner} 
                alt={`Banner ${index + 1}`}
                className={styles.carouselImage}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                data-loaded={imageLoaded[index] || false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Setas de navegação */}
      <button 
        className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
        onClick={goToPrevious}
        aria-label="Imagem anterior"
        type="button"
      >
        ‹
      </button>
      
      <button 
        className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
        onClick={goToNext}
        aria-label="Próxima imagem"
        type="button"
      >
        ›
      </button>

      {/* Indicadores (dots) */}
      <div className={styles.carouselDots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselDot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para imagem ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}