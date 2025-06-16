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