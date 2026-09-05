import styles from "./productsGrid.module.css";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import ProductsGridClient from "./ProductsGridClient";

export default function ProductsGrid({
  products,
  category,
  methodPay
}: {
  products: Product[];
  category: string;
  methodPay: { cashea: number };
}) {
  return (
    <section className={styles.furnitureSection}>
      <div className={styles.furnitureGrid}>
        {products.map((p, k) => (
          <>
            <ProductCard
              key={k}
              category={category}
              product={p}
              isGroupedView={false}
              methodPay={methodPay}
            />
          </>
        ))}

        <ProductsGridClient
          products={products}
          category={category}
          methodPay={methodPay}
        />
      </div>
    </section>
  );
}


