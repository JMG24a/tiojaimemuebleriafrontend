"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR SUPERIOR */}
      <header className={styles.topNavbar}>
        <div className={styles.navRight}>
          <button
            className={styles.navToggle}
            onClick={() => setOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
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
          <a href="/products/muebles">Muebles</a>
          <a href="/products/dormitorios">Dormitorios</a>
          <a href="/products/comedores">Comedores</a>
          <a href="/products/multimuebles">Multimuebles</a>
          <a href="/products/colchones">Colchones</a>
          <a href="/products/accesorios">Accesorios</a>
          <a href="/products/ofertas">Ofertas</a>
          <a href="https://wa.me/584120521922">Contacto de ayuda</a>
          <a href="https://wa.me/584120521922">Buzón de quejas</a>
        </nav>
      </aside>
    </>
  );
}
