import ProductHero from "@/components/ProductHero";
import ProductsGrid from "@/components/ProductsGrid";

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
