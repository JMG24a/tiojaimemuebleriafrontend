import ProductHero from "@/components/ProductHero";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsGridGroup from "@/components/ProductsGridGroup";

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

async function fetchProducts(category: string) {
  const res = await fetch(
    `https://tjm-web-back.onrender.com/products/category/${category}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  // ✔ Next.js 15: params es Promise
  const { category } = await params;

  // ✔ Fetches normales, sin use()
  const methodPay = await getMethodPay();
  const products = await fetchProducts(category);
  const isGrouped = category === "colchones" || category === "dormitorios";
  return (
    <>
      <ProductHero category={category} />

      <section>
        {products.length === 0 && (
          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            No hay productos en esta categoría.
          </p>
        )}

        {!isGrouped && (
          <ProductsGrid
            products={products}
            category={category}
            methodPay={methodPay}
          />
        )}

        {isGrouped && (
          <ProductsGridGroup
            products={products}
            category={category}
            methodPay={methodPay}
          />
        )}
      </section>
    </>
  );
}
