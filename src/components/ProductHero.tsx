'use client';

import { useEffect, useState } from "react";
import styles from "./productHero.module.css";

export default function Hero({ category }: { category: string }) {
  const [portada, setPortada] = useState<string>("/fallback.jpg");

  useEffect(() => {
    async function loadImage() {
      try {
        const res = await fetch(
          `https://tjm-web-back.onrender.com/core/carrusel/aboutUs`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const images = await res.json();

        const img =
          images[0]?.desktop ||
          images[0]?.tablet ||
          images[0]?.mobile ||
          "/fallback.jpg";

        setPortada(img);
      } catch (err) {
        console.error("Error cargando portada:", err);
      }
    }

    loadImage();
  }, [category]); // ← solo se ejecuta cuando cambia la categoría

  return (
    <section className={styles.welcomeSlider}>
      <div
        className={styles.sliders}
        style={{ backgroundImage: `url(${portada})` }}
      >
        <div className={styles.overlay}></div>

        <div className={styles.slogan}>
          <div className={styles.sloganLineDeco}></div>

          <h1>
            <span className={styles.sloganMain}>Crea tu espacio</span>
            <span className={styles.sloganSub}>
              Con los mejores {category}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
