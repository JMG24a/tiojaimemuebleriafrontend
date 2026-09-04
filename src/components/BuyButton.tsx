'use client';

export default function BuyButton({
  product,
  price,
  sede,
  heroImage
}: {
  product: any;
  price: number;
  sede: any;
  heroImage: string;
}) {
  function sendToWhatsApp() {
    if (!sede) {
      alert("Por favor selecciona una sede.");
      return;
    }

    const mensaje = `
✨ *Hola! Quiero completar mi pedido* ✨

🛍️ *Producto:* ${product.modelo}
💵 *Precio final:* ${price}$

🖼️ *Imagen seleccionada:* ${heroImage}

📍 *Sede:* ${sede.label}
📞 *Teléfono:* ${sede.telefono}

🙏 Gracias por su atención.
    `;

    const url = `https://wa.me/${sede.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }

  return (
    <button
      onClick={sendToWhatsApp}
      style={{
        marginTop: "20px",
        padding: "14px 20px",
        background: "#013565",
        color: "#fdb604",
        borderRadius: "10px",
        border: "none",
        fontSize: "1.1rem",
        fontWeight: "600",
        cursor: "pointer",
        width: "100%"
      }}
    >
      Comprar ahora
    </button>
  );
}
