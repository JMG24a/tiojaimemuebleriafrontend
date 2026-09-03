// 'use client';

// import { useState } from "react";
// import styles from "./methodPaySelect.module.css";

// export default function MethodPaySelect({
//   methodPay,
//   basePrice,
//   onPriceChange
// }: {
//   methodPay: any;
//   basePrice: number;
//   onPriceChange: (newPrice: number) => void;
// }) {
//   const [selected, setSelected] = useState<string>("");

//   const base = Number(basePrice);
//   const casheaPercent = Number(methodPay.cashea);

//   // Precio máximo (Cashea)
//   const maxPrice = base + (base * casheaPercent / 100);

//   const methods = [
//     {
//       key: "cashea",
//       label: "Cashea",
//       percent: Number(methodPay.cashea),
//       icon: "/image/cashea.jpg",
//     },
//     {
//       key: "decontado",
//       label: "Decontado",
//       percent: Number(methodPay.decontado),
//       icon: "/image/bcv.webp",
//     },
//     {
//       key: "zelle",
//       label: "Zelle",
//       percent: Number(methodPay.zelle),
//       icon: "/image/zelle.jpg",
//     },
//     {
//       key: "cash - binance",
//       label: "Cash - Binance",
//       percent: Number(methodPay["cash - binance"]),
//       icon: "/image/binance.png",
//     }
//   ];

//   function getRealDiscount(percent: number, label: string) {
//     if(label == "Cashea"){
//       return "0% Inicial"
//     }
//     const methodPrice = base + (base * percent / 100);
//     const realDiscount = ((maxPrice - methodPrice) / maxPrice) * 100;
//     return `${realDiscount.toFixed(1)}% OFF`;
//   }

//   function handleSelect(methodKey: string, percent: number) {
//     setSelected(methodKey);

//     const newPrice = base + (base * percent / 100);
//     onPriceChange(Number(newPrice.toFixed(2)));
//   }

//   return (
//     <div className={styles.selectBox}>
//       {methods.map((m) => (
//         <button
//           key={m.key}
//           className={`${styles.option} ${
//             selected === m.key ? styles.active : ""
//           }`}
//           onClick={() => handleSelect(m.key, m.percent)}
//         >
//           <img src={m.icon} alt={m.label} className={styles.icon} />

//           <div className={styles.texts}>
//             <span className={styles.label}>{m.label}</span>
//           </div>

//           <span className={styles.percent}>{getRealDiscount(m.percent, m.label)}</span>
//         </button>
//       ))}
//     </div>
//   );
// }

'use client';

import { useState } from "react";
import styles from "./methodPaySelect.module.css";

export default function MethodPaySelect({
  methodPay,
  basePrice,
  onPriceChange
}: {
  methodPay: any;
  basePrice: number;
  onPriceChange: (newPrice: number) => void;
}) {
  const base = Number(basePrice);
  const casheaPercent = Number(methodPay.cashea);

  // Precio máximo (Cashea)
  const maxPrice = base + (base * casheaPercent / 100);

  const methods = [
    {
      key: "cashea",
      label: "Cashea",
      percent: Number(methodPay.cashea),
      icon: "/image/cashea.jpg",
    },
    {
      key: "decontado",
      label: "Decontado",
      percent: Number(methodPay.decontado),
      icon: "/image/bcv.webp",
    },
    {
      key: "zelle",
      label: "Zelle",
      percent: Number(methodPay.zelle),
      icon: "/image/zelle.jpg",
    },
    {
      key: "cash - binance",
      label: "Cash - Binance",
      percent: Number(methodPay["cash - binance"]),
      icon: "/image/binance.png",
    }
  ];

  // Estado del dropdown
  const [open, setOpen] = useState(false);

  // Estado del método seleccionado (por defecto Cashea)
  const [selected, setSelected] = useState(methods[0]);

  function getRealDiscount(percent: number) {
    const methodPrice = base + (base * percent / 100);
    const realDiscount = ((maxPrice - methodPrice) / maxPrice) * 100;
    return realDiscount.toFixed(1);
  }

  function handleSelect(method: any) {
    setSelected(method);
    setOpen(false);

    const newPrice = base + (base * method.percent / 100);
    onPriceChange(Number(newPrice.toFixed(2)));
  }

  return (
    <div className={styles.wrapper}>
      {/* SELECT TRIGGER */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <img src={selected.icon} className={styles.icon} />
        <div className={styles.texts}>
          <span className={styles.label}>{selected.label}</span>
          <span className={styles.desc}>
            {getRealDiscount(selected.percent)}% OFF
          </span>
        </div>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </button>

      {/* OPTIONS */}
      {open && (
        <div className={styles.options}>
          {methods.map((m) => (
            <button
              key={m.key}
              className={styles.option}
              onClick={() => handleSelect(m)}
            >
              <img src={m.icon} className={styles.icon} />

              <div className={styles.texts}>
                <span className={styles.label}>{m.label}</span>
              </div>

              <span className={styles.percent}>
                {getRealDiscount(m.percent)}% OFF
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
