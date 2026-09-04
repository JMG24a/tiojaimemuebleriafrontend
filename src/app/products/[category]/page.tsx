import ProductHero from "@/components/ProductHero";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsGridClient from "@/components/ProductsGridClient";

async function getMethodPay() {
  const ids = [1, 2, 3, 4];
  const responses = await Promise.all(
    ids.map(id =>
      fetch(`https://tjm-web-back.onrender.com/core/${id}`, {
        cache: "no-store"
      }).then(r => r.json())
    )
  );
  return {
    cashea: responses[0].precio,
    decontado: responses[1].precio,
    zelle: responses[2].precio,
    "cash - binance": responses[3].precio
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const methodPay = await getMethodPay();
  let products = [];

  try {
    const res = await fetch(`https://tjm-web-back.onrender.com/products/category/${category}`, {
      cache: "no-store"
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error("Error:", err);
  }

  return (
    <>
     <ProductHero category={category} />

      <section>
        {products.length === 0 && (
          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            No hay productos en esta categoría.
          </p>
        )}

        <ProductsGrid products={products} category={category} methodPay={methodPay}/>
      </section>
    </>
  );
}

// app/products/[category]/page.tsx
// import ProductHero from "@/components/ProductHero";
// import ProductsGrid from "@/components/ProductsGrid";
// import type { Product } from "@/types/product";

// export const revalidate = 60;

// async function fetchProductsByCategory(category: string) {
//   const url = `https://tjm-web-back.onrender.com/products/category?category=${encodeURIComponent(
//     category
//   )}&fields=category,modelo,precio,sku,images,descripcion&limit=36`;
//   const res = await fetch(url, { next: { revalidate } });
//   if (!res.ok) throw new Error("Error fetching products");
//   return (await res.json()) as Product[];
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string } | Promise<{ category: string }>;
// }) {
//   // Resolvemos params si viene como Promise, o lo usamos directamente si ya es objeto
//   const resolvedParams = (params as any)?.then ? await params : params;
//   const { category } = resolvedParams as { category: string };

//   let products: Product[] = [];

//   try {
//     products = await fetchProductsByCategory(category);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     products = [];
//   }

//   return (
//     <>
//       <ProductHero category={category} />
//       <section>
//         {products.length === 0 && (
//           <p style={{ marginTop: "20px", opacity: 0.7 }}>
//             No hay productos en esta categoría.
//           </p>
//         )}
//         <ProductsGrid products={products} category={category} methodPay={{ cashea: 0 }} />
//       </section>
//     </>
//   );
// }

