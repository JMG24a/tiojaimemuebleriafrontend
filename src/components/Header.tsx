"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);

  const isProductPage = segments.length === 3;
  // products / muebles / 1  → 3 segmentos

  const category = segments[1];
  // muebles

  return (
    <>
      <header className={styles.topNavbar}>
        <div className={styles.navRight}>

          {/* SI ESTOY EN UN PRODUCTO → MOSTRAR BOTÓN VOLVER */}
          {isProductPage ? (
            <button
              className={styles.navToggle}
              onClick={() => router.push(`/products/${category}`)}
            >
              <img src="/image/atras.png" alt="volver" />
            </button>
          ) : (
            /* SI NO → MOSTRAR HAMBURGUESA */
            <button
              className={styles.navToggle}
              onClick={() => setOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

        </div>

        <div className={styles.navCenter}>
          <Image
            src="/image/logo_tjm.png"
            alt="logo"
            width={80}
            height={80}
            className={styles.navLogo}
          />
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`${styles.navOverlay} ${open ? styles.active : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`${styles.navSidebar} ${open ? styles.active : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <Image
            src="/image/logo_tjm.png"
            alt="logo"
            width={80}
            height={80}
            className={styles.sidebarLogo}
          />
        </div>

        <nav className={styles.sidebarMenu}>
          <a href="/">Inicio</a>
          <a href="/products/muebles">Muebles</a>
          <a href="/products/dormitorios">Dormitorios</a>
          <a href="/products/comedores">Comedores</a>
          <a href="/products/multimuebles">Multimuebles</a>
          <a href="/products/colchones">Colchones</a>
          <a href="/products/accesorios">Accesorios</a>
          <a href="/products/ofertas">Ofertas</a>
          <a href="https://wa.me/584120521922">Centro de Ayuda</a>
        </nav>
      </aside>
    </>
  );
}
