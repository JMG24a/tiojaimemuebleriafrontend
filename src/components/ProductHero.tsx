'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./productHero.module.css";

export default function Hero({ category }: { category: string }) {
  const [portada, setPortada] = useState<string>("/fallback.jpg");
  const [id, setId] = useState<number>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================
  // 1. Cargar portada actual
  // ============================
  async function loadImage() {
    try {
      const res = await fetch(
        `https://tjm-web-back.onrender.com/core/carrusel/${category}`,
        { cache: "no-store" }
      );

      if (!res.ok) return;

      const images = await res.json();
      console.log("🚀 ~ loadImage ~ images:", images)

      const img =
        images[0]?.desktop ||
        images[0]?.tablet ||
        images[0]?.mobile ||
        "/fallback.jpg";

      setId(images[0].id)
      setPortada(img);
    } catch (err) {
      console.error("Error cargando portada:", err);
    }
  }

  useEffect(() => {
    loadImage();
  }, [category]);

  // ============================
  // 2. Subir imagen a Cloudinary
  // ============================
  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/dmajdkimk/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudData = await cloudRes.json();
    console.log("🚀 ~ uploadToCloudinary ~ cloudData:", cloudData)
    return cloudData.secure_url;
  }

  // ============================
  // 3. PATCH al backend
  // ============================
  async function updateBackend(url: string) {
    // En tu backend, la portada es siempre el registro 1
    // y el campo desktop es el que usas como portada
    await fetch(`https://tjm-web-back.onrender.com/core/carrusel/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desktop: url }),
    });
  }

  // ============================
  // 4. Handler del input
  // ============================
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Subir a Cloudinary
      const url = await uploadToCloudinary(file);

      // Actualizar backend
      await updateBackend(url);

      // Recargar portada
      await loadImage();

      // Limpiar input
      e.target.value = "";
    } catch (err) {
      console.error("Error actualizando portada:", err);
    }
  }

  // ============================
  // 5. Abrir input desde botón
  // ============================
  function openFilePicker() {
    fileInputRef.current?.click();
  }

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

          {/* ============================
              Botón para cambiar portada
          ============================ */}
          <button
            onClick={openFilePicker}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#fff",
              color: "#013565",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cambiar portada
          </button>

          {/* Input oculto */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </section>
  );
}
