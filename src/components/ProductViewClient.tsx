// "use client";

// import { useEffect, useState } from "react";
// import styles from "./productPage.module.css";
// import MethodPaySelect from "./MethodPaySelect";
// import LocationSelect from "./LocationSelect";
// import BuyButton from "./BuyButton";
// import { Product } from "@/types/product";

// export default function ProductViewClient({ product, images, methodPay }:{
//   product: Product;
//   images: string[];
//   methodPay: { cashea: number };
// }) {
//   const [heroImage, setHeroImage] = useState(images[0]);
//   const [location, setLocation] = useState({
//     key: "San Pablo",
//     label: "San Pablo",
//     telefono: "0412478442",
//     icon: "/image/location.jpg",
//   });
//   const [priceChanged, setPriceChanged] = useState(false);
//   const [price, setPrice] = useState(() => {
//     const base = Number(product.precio);
//     const casheaPercent = Number(methodPay.cashea);
//     return base + (base * casheaPercent / 100);
//   });

//   useEffect(() => {
//     setPriceChanged(true);
//     const t = setTimeout(() => setPriceChanged(false), 250);
//     return () => clearTimeout(t);
//   }, [price]);

//   const sedes = [
//     { key: "San Pablo", label: "San Pablo", telefono: "584228463448", icon: "/image/location.jpg" },
//     { key: "San Felipe", label: "San Felipe", telefono: "584121539695", icon: "/image/location.jpg" },
//     { key: "Barquisimeto", label: "Barquisimeto", telefono: "584120213946", icon: "/image/location.jpg" },
//     { key: "Ciudad Ojeda", label: "Ciudad Ojeda", telefono: "584126158205", icon: "/image/location.jpg" }
//   ];

//   return (
//     <>
//       {/* HERO CONTROLADO POR CLIENTE */}
//       <div
//         className={styles.heroImage}
//         style={{ backgroundImage: `url(${heroImage})` }}
//       />

//       <div className={styles.productInfo}>
//         <h1 className={styles.title}>{product.modelo}</h1>

//         <div className={styles.variantsGrid}>
//           {images.map((url: string, index: any) => (
//             <button
//               key={index}
//               className={styles.variantCard}
//               onClick={() => setHeroImage(url)}
//             >
//               <img src={url} alt={`variante ${index}`} />
//             </button>
//           ))}
//         </div>

//         <p className={styles.price}>{price}$</p>

//         <MethodPaySelect
//           methodPay={methodPay}
//           basePrice={Number(product.precio)}
//           onPriceChange={setPrice}
//         />

//         <LocationSelect
//           sedes={sedes}
//           onSelect={(sede) => setLocation(sede)}
//         />

//         <BuyButton
//           product={product}
//           price={price}
//           sede={location}
//           heroImage={heroImage}
//         />

//         <p className={styles.description}>{product.descripcion}</p>
//       </div>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./productPage.module.css";
import MethodPaySelect from "./MethodPaySelect";
import LocationSelect from "./LocationSelect";
import BuyButton from "./BuyButton";
import { cloudinary } from "@/lib/cloudinary";
import { Product } from "@/types/product";

export default function ProductViewClient({
  product,
  images,
  methodPay
}: {
  product: Product;
  images: string[];
  methodPay: { cashea: number };
}) {
  const [heroImage, setHeroImage] = useState(images[0]);

  const [location, setLocation] = useState({
    key: "San Pablo",
    label: "San Pablo",
    telefono: "0412478442",
    icon: "/image/location.jpg",
  });

  const basePrice = Number(product.precio);
  const casheaPrice = basePrice + (basePrice * methodPay.cashea / 100);

  const [price, setPrice] = useState(casheaPrice);
  const [priceChanged, setPriceChanged] = useState(false);

  // Animación del precio
  useEffect(() => {
    setPriceChanged(true);
    const t = setTimeout(() => setPriceChanged(false), 250);
    return () => clearTimeout(t);
  }, [price]);

  const sedes = [
    { key: "San Pablo", label: "San Pablo", telefono: "584228463448", icon: "/image/location.jpg" },
    { key: "San Felipe", label: "San Felipe", telefono: "584121539695", icon: "/image/location.jpg" },
    { key: "Barquisimeto", label: "Barquisimeto", telefono: "584120213946", icon: "/image/location.jpg" },
    { key: "Ciudad Ojeda", label: "Ciudad Ojeda", telefono: "584126158205", icon: "/image/location.jpg" }
  ];

  return (
    <>
      {/* HERO optimizado */}
      <div className={styles.heroImage}>
        <Image
          src={cloudinary(heroImage, 1200, 70)}
          alt={product.modelo}
          fill
          priority
          placeholder="blur"
          blurDataURL="/image/blur-placeholder.jpg"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.title}>{product.modelo}</h1>

        {/* Variantes */}
        <div className={styles.variantsGrid}>
          {images.map((url, index) => (
            <button
              key={index}
              className={styles.variantCard}
              onClick={() => setHeroImage(url)}
            >
              <Image
                src={cloudinary(url, 300, 70)}
                alt={`variante ${index}`}
                width={120}
                height={120}
                placeholder="blur"
                blurDataURL="/image/blur-placeholder.jpg"
              />
            </button>
          ))}
        </div>

        {/* Precio con animación */}
        <div className={styles.priceBox}>
          {price !== casheaPrice && (
            <span className={styles.oldPrice}>
              {casheaPrice}$
            </span>
          )}

          <span
            className={`${styles.priceAnimated} ${
              priceChanged ? styles.changed : ""
            }`}
          >
            {price}$
          </span>
        </div>

        <MethodPaySelect
          methodPay={methodPay}
          basePrice={basePrice}
          onPriceChange={setPrice}
        />

        <LocationSelect
          sedes={sedes}
          onSelect={(sede) => setLocation(sede)}
        />

        <BuyButton
          product={product}
          price={price}
          sede={location}
          heroImage={heroImage}
        />

        {/* <p className={styles.description}>{product.descripcion}</p> */}
      </div>
    </>
  );
}
