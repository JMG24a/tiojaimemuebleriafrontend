"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./carousel.module.css";

interface CarouselItem {
  mobile: string;
  tablet: string;
  desktop: string;
  alt?: string;
}

export default function Carousel({ group }: { group: string }) {
  const [slides, setSlides] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Fetch
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://tjm-web-back.onrender.com/core/carrusel/${group}`);
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("Error cargando carrusel:", error);
      }
    }
    load();
  }, [group]);

  // Auto-rotación
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides]);

  // Prefetch inteligente de imágenes
  useEffect(() => {
    if (!slides.length) return;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    const current = slides[currentIndex];
    const next = slides[(currentIndex + 1) % slides.length];
    const prev = slides[currentIndex === 0 ? slides.length - 1 : currentIndex - 1];

    // Detectar tamaño de pantalla
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;

    const getSrc = (item: CarouselItem) => {
      if (width <= 768) return item.mobile;
      if (width <= 1200) return item.tablet;
      return item.desktop;
    };

    // Preload del slide actual
    preloadImage(getSrc(current));

    // Preload del siguiente
    preloadImage(getSrc(next));

    // Preload del anterior
    preloadImage(getSrc(prev));
  }, [currentIndex, slides]);

  // Swipe en móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;

    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // siguiente
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      // anterior
      setCurrentIndex((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    }
  };

  // Selección de imagen según pantalla
  const getSrc = (item: CarouselItem) => {
    if (typeof window === "undefined") return item.desktop;
    const width = window.innerWidth;
    if (width <= 768) return item.mobile;
    if (width <= 1200) return item.tablet;
    return item.desktop;
  };

  if (!slides.length) return null;

  return (
    <section className={styles.sliderAbout}>
      <div
        className={styles.slidesAbout}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Placeholder mientras no hay slides */}
        {slides.length === 0 && (
          <div className={styles.placeholder}></div>
        )}

        {slides.map((item, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <img
              src={getSrc(item)}
              alt={item.alt || "Imagen carrusel"}
              loading="lazy"
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.dotActive : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
