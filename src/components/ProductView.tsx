// components/ProductView.tsx (SERVER)
import styles from "./productPage.module.css";
import { Product } from "@/types/product";
import ProductViewClient from "./ProductViewClient";

export default function ProductView({
  product,
  category,
  images,
  methodPay
}: {
  product: Product;
  category: string;
  images: string[];
  methodPay: { cashea: number };
}) {
  return (
    <section className={styles.productPage}>
      {/* CLIENT INTERACTIONS */}
      <ProductViewClient
        product={product}
        category={category}
        images={images}
        methodPay={methodPay}
      />
    </section>
  );
}
