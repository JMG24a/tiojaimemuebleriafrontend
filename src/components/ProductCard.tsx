import Link from "next/link";
import styles from "./ProductCard.module.css";

interface TypeMethod{
  cashea: number
}

export default function ProductCard({ product, category, methodPay }: { product: any; category: string, methodPay: TypeMethod }) {

  const images = product.images.split("|");
  const base = Number(product.precio);
  const casheaPercent = Number(methodPay.cashea);
  const maxPrice = base + (base * casheaPercent / 100);

  return (
    <Link href={`/products/${category}/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={images[0]} alt={product.modelo} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.modelo}</h3>
        <p className={styles.price}>
          {base}$ - ${maxPrice.toFixed(2)}BCV
        </p>
      </div>
    </Link>
  );
}
