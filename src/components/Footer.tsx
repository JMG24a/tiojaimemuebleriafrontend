"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* LOCALES */}
        <div className={styles.footerSection}>
          <h4>Nuestros Locales</h4>

          <div className={styles.location}>
            <strong>Tio Jaime – San Pablo</strong>
            <p>Esquina calle San Agustín, sector carrizales</p>
          </div>

          <div className={styles.location}>
            <strong>Tio Jaime – Barquisimeto</strong>
            <p>Centro Calle 21 con carrera 21</p>
          </div>

          <div className={styles.location}>
            <strong>Tio Jaime – Ojeda</strong>
            <p>Piar con Miranda frente a la E/S Milenio</p>
          </div>

          <div className={styles.location}>
            <strong>Tio Jaime – San Felipe</strong>
            <p>Segunda AV con calle 20</p>
          </div>
        </div>

        {/* CONTACTO */}
        <div className={styles.footerSectionContact}>
          <h4>Contáctanos.</h4>

          <a
            href="https://instagram.com/tiojaimemuebleria"
            target="_blank"
            className={styles.social}
          >
            <Image src="/image/instagram.png" alt="logo" width={24} height={24} />
          </a>

          <button onClick={() => setOpen(true)} className={styles.social}>
            <Image src="/image/whatsapp.png" alt="logo" width={24} height={24} />
          </button>
        </div>

        {/* MODAL */}
        {open && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContentWs}>
              <div className={styles.linksContainer}>
                <a href="https://wa.me/584228463448" className={styles.locationLink}>
                  San Pablo Yaracuy
                  <Image src="/image/whatsapp.png" alt="logo" width={24} height={24} />
                </a>

                <a href="https://wa.me/584120213946" className={styles.locationLink}>
                  Lara Barquisimeto
                  <Image src="/image/whatsapp.png" alt="logo" width={24} height={24} />
                </a>

                <a href="https://wa.me/584126158205" className={styles.locationLink}>
                  Ciudad Ojeda Zulia
                  <Image src="/image/whatsapp.png" alt="logo" width={24} height={24} />
                </a>
              </div>

              <button onClick={() => setOpen(false)} className={styles.closeBtn}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerBottom}>
        <a className={styles.admin} href="/admin.html">
          © Mueblería Tio Jaime. Todos los derechos reservados.
        </a>
      </div>
    </footer>
  );
}
