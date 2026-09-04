'use client'
import Link from "next/link";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";
import type { Product } from "@/types/product";

interface TypeMethod{
  cashea: number
}

export default function ProductCard({ product, category, methodPay }: { product: Product, category: string, methodPay: TypeMethod }) {
  const img = product.images?.split("|")[0] ?? "/placeholder.png";
  const src = cloudinaryUrl(img, 400, 70);
  const base = Number(product.precio);
  const casheaPercent = Number(methodPay.cashea);
  const maxPrice = base + (base * casheaPercent / 100);

  return (
    <Link href={`/products/${category}/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={src}
          alt={product.modelo}
          width={400}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          priority={false}
          placeholder="blur"
          blurDataURL="/placeholder-small.jpg"
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.modelo}</h3>
        <p className={styles.price}>{base}$ - ${maxPrice.toFixed(0)}BCV</p>
      </div>
    </Link>
  );
}
