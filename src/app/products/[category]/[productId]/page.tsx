import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";

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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; productId: string }>;
}) {
  // ✔ Next.js 15: params es Promise
  const { category, productId } = await params;

  const methodPay = await getMethodPay();

  const res = await fetch(
    `https://tjm-web-back.onrender.com/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const product = await res.json();
  const images = product.images.split("|");

  return (
    <ProductView
      product={product}
      images={images}
      methodPay={methodPay}
    />
  );
}
