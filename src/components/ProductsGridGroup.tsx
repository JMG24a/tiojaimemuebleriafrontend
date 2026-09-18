// 'use client';

// import { Product } from "@/types/product";
// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import styles from "./productsGrid.module.css";
// import ProductsGridClient from "./ProductsGridClient";


// function getBaseName(modelo: string) {
//   return modelo.split(" ")[0].toLowerCase();
// }

// // elimina la palabra base (coco → individual)
// function removeBaseName(modelo: string) {
//   const parts = modelo.split(" ");
//   return parts.slice(1).join(" "); // todo menos la primera palabra
// }

// // elimina la variante (individual → coco)
// function removeVariantName(modelo: string) {
//   // return modelo.split(" ")[0]; // solo la primera palabra
//   const base = modelo.split(" ")[0];
//   return base.charAt(0).toUpperCase() + base.slice(1);
// }

// function groupProducts(products: Product[]) {
//   const groups: Record<string, Product[]> = {};

//   for (const p of products) {
//     const base = getBaseName(p.modelo);

//     if (!groups[base]) groups[base] = [];
//     groups[base].push(p);
//   }

//   return groups;
// }

// function getFirstImage(product: Product) {
//   return product.images.split("|")[0];
// }

// export default function ProductsGridGroup({
//   products,
//   category,
//   methodPay
// }: {
//   products: Product[];
//   category: string;
//   methodPay: any;
// }) {
//   const [selectedModel, setSelectedModel] = useState<string | null>(null);

//   const groups = groupProducts(products);

//   const filtered = selectedModel ? groups[selectedModel] : null;

//   return (
//     <section className={styles.furnitureSection}>
//       {/* Botón volver */}
//       {selectedModel && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "20px",
//             padding: "0px 15px",
//             color: "#444",
//           }}>
//           <button
//             onClick={() => setSelectedModel(null)}
//             style={{
//               marginBottom: "20px",
//               padding: "10px 20px",
//               background: "#333",
//               color: "#fff",
//               borderRadius: "6px",
//               border: "none",
//               cursor: "pointer"
//             }}
//           >
//             Volver
//           </button>
//           <p style={{fontSize: "1rem"}}>Busca Tu Medida Ideal</p>
//         </div>
//       )}
//     <>
//       {/* Vista agrupada */}
//       {!selectedModel && (
//         <div className={styles.furnitureGrid}>
//           {Object.keys(groups).map((model, k) => {
//             const firstProduct = groups[model][0];
//             return (
//               <article
//                 key={k}
//                 onClick={() => setSelectedModel(model)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <ProductCard
//                   product={{
//                     ...firstProduct,
//                     modelo: removeVariantName(firstProduct.modelo) // ← solo “coco”
//                   }}
//                   category={category}
//                   isGroupedView={true}
//                   methodPay={methodPay}
//                   showPrice={false}
//                 />
//               </article>
//             );
//           })}

//           <ProductsGridClient
//             products={products}
//             category={category}
//             methodPay={methodPay}
//           />
//         </div>
//       )}

//       {/* Vista filtrada */}
//       {selectedModel && filtered && (
//         <div className={styles.furnitureGrid}>
//           {groups[selectedModel].map((product, k) => (
//             <ProductCard
//               key={k}
//               product={{
//                 ...product,
//                 modelo: removeBaseName(product.modelo) // ← “individual”, “matrimonial”, etc.
//               }}
//               category={category}
//               isGroupedView={false}
//               methodPay={methodPay}
//               showPrice={true}
//             />
//           ))}

//           <ProductsGridClient
//             products={products}
//             category={category}
//             methodPay={methodPay}
//           />
//         </div>
//       )};
//     </>
//   </section>
//   )
// }

'use client';

import { Product } from "@/types/product";
import { useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./productsGrid.module.css";
import ProductsGridClient from "./ProductsGridClient";

function getBaseName(modelo: string) {
  return modelo.split(" ")[0].toLowerCase();
}

function removeBaseName(modelo: string) {
  const parts = modelo.split(" ");
  return parts.slice(1).join(" ");
}

function removeVariantName(modelo: string) {
  const base = modelo.split(" ")[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
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

/* 🔥 ORDENADOR NUEVO */
function sortProducts(products: Product[]) {
  const orderType = {
    base: 1,
    "1 pillow": 2,
    "2 pillow": 3
  };

  const orderSize = {
    individual: 1,
    matrimonial: 2,
    queen: 3,
    king: 4
  };

  function getType(name: string) {
    if (name.includes("1 pillow")) return "1 pillow";
    if (name.includes("2 pillow")) return "2 pillow";
    return "base";
  }

  function getSize(name: string) {
    if (name.includes("individual")) return "individual";
    if (name.includes("matrimonial")) return "matrimonial";
    if (name.includes("queen")) return "queen";
    if (name.includes("king")) return "king";
    return "individual";
  }

  return [...products].sort((a, b) => {
    const typeA = orderType[getType(a.modelo)];
    const typeB = orderType[getType(b.modelo)];

    if (typeA !== typeB) return typeA - typeB;

    const sizeA = orderSize[getSize(a.modelo)];
    const sizeB = orderSize[getSize(b.modelo)];

    return sizeA - sizeB;
  });
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

  /* 🔥 Aplicamos ordenamiento cuando hay selección */
  const filtered = selectedModel ? sortProducts(groups[selectedModel]) : null;

  return (
    <section className={styles.furnitureSection}>
      {selectedModel && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            padding: "0px 15px",
            color: "#444",
          }}>
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
          <p style={{fontSize: "1rem"}}>Busca Tu Medida Ideal</p>
        </div>
      )}

      {/* Vista agrupada */}
      {!selectedModel && (
        <div className={styles.furnitureGrid}>
          {Object.keys(groups).map((model, k) => {
            const firstProduct = groups[model][0];
            return (
              <article
                key={k}
                onClick={() => setSelectedModel(model)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  product={{
                    ...firstProduct,
                    modelo: removeVariantName(firstProduct.modelo)
                  }}
                  category={category}
                  isGroupedView={true}
                  methodPay={methodPay}
                  showPrice={false}
                />
              </article>
            );
          })}

          <ProductsGridClient
            products={products}
            category={category}
            methodPay={methodPay}
          />
        </div>
      )}

      {/* Vista filtrada */}
      {selectedModel && filtered && (
        <div className={styles.furnitureGrid}>
          {filtered.map((product, k) => (
            <ProductCard
              key={k}
              product={{
                ...product,
                modelo: removeBaseName(product.modelo)
              }}
              category={category}
              isGroupedView={false}
              methodPay={methodPay}
              showPrice={true}
            />
          ))}

          <ProductsGridClient
            products={products}
            category={category}
            methodPay={methodPay}
          />
        </div>
      )}
    </section>
  );
}
