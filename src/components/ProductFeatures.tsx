'use client';

const SIZES = {
  individual: "100cm x 190cm",
  matrimonial: "140cm x 190cm",
  queen: "160cm x 190cm",
  king: "200cm x 200cm",

  // comedores
  4: "140cm x 180cm",
  6: "160cm x 190cm",
} as const;

export type SizeKey = keyof typeof SIZES;

export function extractModelKey(name: string): SizeKey | null {
  const parts = name.toLowerCase().split(" ");

  for (const p of parts) {
    if (p in SIZES) {
      return p as SizeKey;
    }
  }

  return null;
}


export function getFeatures(
  category: string,
  product: { modelo: string },
  price: number
): string[] {
  const modeloKey = extractModelKey(product.modelo);

  switch (category) {
    case "muebles":
      return [
        "🪓 Madera Seca al Horno.",
        "🛌 Resortes Pocket.",
        `📄 Garantía de ${price > 500 ? 1 : 3} año.`,
        "🕓 30 días hábiles.",
        "📦 Embalaje sin cargo.",
        "📏 240cm - 240cm",
      ];

    case "dormitorios":
      return [
        "🪓 Madera Seca al Horno.",
        "📄 Garantía de 2 año.",
        "🕓 30 días hábiles.",
        "📦 Embalaje sin cargo.",
        modeloKey ? `📏 ${SIZES[modeloKey]}` : "📏 Tamaño no disponible",
      ];

    case "comedores":
      return [
        "🪓 Madera Seca al Horno.",
        "📄 Garantía de 1 año.",
        "📦 Embalaje sin cargo.",
        modeloKey ? `📏 ${SIZES[modeloKey]}` : "📏 Tamaño no disponible",
      ];

    default:
      return ["Sin características disponibles."];
  }
}



export default function ProductFeatures({
  category,
  product,
  price,
}: {
  category: string;
  product: any;
  price: number;
}) {
  const features = getFeatures(category, product, price);

  return (
    <ul style={{ margin: "10px", lineHeight: "1.8", fontSize: "1.0rem", color: "gray"}}>
      {features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
  );
}


