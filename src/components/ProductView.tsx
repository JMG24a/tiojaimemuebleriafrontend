'use client';

import { useState } from "react";
import styles from "./productPage.module.css";
import MethodPaySelect from "./MethodPaySelect";
import LocationSelect from "./LocationSelect";
import BuyButton from "./BuyButton";

export default function ProductView({
  product,
  images,
  methodPay
}: {
  product: any;
  images: string[];
  methodPay: {}
}) {
  const [heroImage, setHeroImage] = useState(images[0]);
  const [location, setLocation] = useState({
      key: "San Pablo",
      label: "San Pablo",
      telefono: "0412478442",
      icon: "/image/location.jpg",
    },)
  const [price, setPrice] = useState(()=>{
    const base = Number(product.precio);
    const casheaPercent = Number(methodPay.cashea);
    const maxPrice = base + (base * casheaPercent / 100);
    return maxPrice
  });

  const sedes = [
    {
      key: "San Pablo",
      label: "San Pablo",
      telefono: "584228463448",
      icon: "/image/location.jpg",
    },
    {
      key: "San Felipe",
      label: "San Felipe",
      telefono: "584121539695",
      icon: "/image/location.jpg",
    },
    {
      key: "Barquisimeto",
      label: "Barquisimeto",
      telefono: "584120213946",
      icon: "/image/location.jpg",
    },
    {
      key: "Ciudad Ojeda",
      label: "Ciudad Ojeda",
      telefono: "584126158205",
      icon: "/image/location.jpg",
    }
  ];


  return (
    <section className={styles.productPage}>
      {/* HERO IMAGE */}
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* PRODUCT INFO */}
      <div className={styles.productInfo}>
        <h1 className={styles.title}>{product.modelo}</h1>

        <div className={styles.variantsGrid}>
          {images.map((url, index) => (
            <button
              key={index}
              className={styles.variantCard}
              onClick={() => setHeroImage(url)}
            >
              <img src={url} alt={`variante ${index}`} />
            </button>
          ))}
        </div>

        <p className={styles.price}>{price}$</p>

        <MethodPaySelect
          methodPay={methodPay}
          basePrice={Number(product.precio)}
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

        <p className={styles.description}>{product.desc}</p>

      </div>
    </section>
  );
}
