'use client';

import { useState } from "react";
import styles from "./locationSelect.module.css";

export default function LocationSelect({
  sedes,
  onSelect
}: {
  sedes: {
    key: string;
    label: string;
    telefono: string;
    icon: string;
  }[];
  onSelect: (sede: any) => void;
}) {
  const [open, setOpen] = useState(false);

  // Por defecto: San Pablo
  const [selected, setSelected] = useState(sedes[0]);

  function handleSelect(sede: any) {
    setSelected(sede);
    setOpen(false);
    onSelect(sede);
  }

  return (
    <div className={styles.wrapper}>
      {/* TRIGGER */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <img src={selected.icon} className={styles.icon} />

        <div className={styles.texts}>
          <span className={styles.label}>{selected.label}</span>
          <span className={styles.desc}>Tel: {selected.telefono}</span>
        </div>

        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </button>

      {/* OPTIONS */}
      {open && (
        <div className={styles.options}>
          {sedes.map((sede) => (
            <button
              key={sede.key}
              className={styles.option}
              onClick={() => handleSelect(sede)}
            >
              <img src={sede.icon} className={styles.icon} />

              <div className={styles.texts}>
                <span className={styles.label}>{sede.label}</span>
                <span className={styles.desc}>Tel: {sede.telefono}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
