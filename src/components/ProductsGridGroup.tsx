'use client';

import { Product } from "@/types/product";
import { useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./productsGrid.module.css";

function getBaseName(modelo: string) {
  return modelo.split(" ")[0].toLowerCase();
}

function groupProducts(products: Product[]) {
  const groups: Record<string, Product[]> = {};

  for (const p of products) {
    const base = getBaseName(p.modelo);

    if (!groups[base]) groups[base] = [];
    groups[base].push(p);
  }

  return groups;
}

function getFirstImage(product: Product) {
  return product.images.split("|")[0];
}

export default function ProductsGridGroup({
  products,
  category,
  methodPay
}: {
  products: Product[];
  category: string;
  methodPay: any;
}) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const groups = groupProducts(products);

  const filtered = selectedModel ? groups[selectedModel] : null;

  return (
    <section className={styles.furnitureSection}>
      {/* Botón volver */}
      {selectedModel && (
        <button
          onClick={() => setSelectedModel(null)}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            background: "#333",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Volver
        </button>
      )}
    <div className={styles.furnitureGrid}>
      {/* Vista agrupada */}
      {!selectedModel && (
        <>
          {Object.keys(groups).map((model) => {
            const firstProduct = groups[model][0];
            const firstImage = getFirstImage(firstProduct);

            return (
              <article
                onClick={() => setSelectedModel(model)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  product={firstProduct}
                  category={category}
                  isGroupedView={true}
                  methodPay={methodPay}
                  showPrice={false}
                />
              </article>
            );
          })}
        </>
      )}

      {/* Vista filtrada */}
      {selectedModel && filtered && (
        <>
          {groups[selectedModel].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              isGroupedView={false}
              methodPay={methodPay}
              showPrice={true}   // ← mostrar precio
            />
          ))}
        </>
      )};
    </div>
  </section>
  )
}
