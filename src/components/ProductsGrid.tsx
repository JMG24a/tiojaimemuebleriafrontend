'use client';

import { useState } from "react";
import * as XLSX from "xlsx";
import styles from "./productsGrid.module.css";
import ProductCard from "./ProductCard";
import styles2 from "./ProductCard.module.css";
import CreateProductModal from "./CreateProductModal";

export default function ProductsGrid({ products, category, methodPay }) {
  const [openModal, setOpenModal] = useState(false);

  function downloadExcel() {
    const casheaPercent = Number(methodPay.cashea);

    // Convertimos los productos al formato del Excel
    const rows = products.map((p) => {
      const basePrice = Number(p.precio);
      const finalPrice = basePrice + (basePrice * casheaPercent / 100);

      return {
        category: p.category,
        modelo: p.modelo,
        precio: finalPrice,
        sku: p.sku,
        images: p.images,
        descripcion: p.descripcion
      };
    });

    // Creamos la hoja
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Creamos el libro
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    // Descargamos el archivo
    XLSX.writeFile(workbook, "productos.xlsx");
  }

  return (
    <section className={styles.furnitureSection}>
      <div className={styles.furnitureGrid}>

        {/* CARD PARA CREAR PRODUCTO */}
        <button
          className={styles2.card}
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles2.imageWrapper}>
            <img src={"/image/plus.png"} alt={"add"} />
          </div>

          <div className={styles2.info}>
            <h3 className={styles2.title}>Crear producto</h3>
            <p className={styles2.price}>Añadir nuevo</p>
          </div>
        </button>

        {/* PRODUCTOS */}
        {products.map((p, k) => (
          <ProductCard
            category={category}
            product={p}
            methodPay={methodPay}
            key={k}
          />
        ))}

        {/* CARD PARA DESCARGAR PRODUCTOS */}
        <button
          className={styles2.card}
          onClick={downloadExcel}
          style={{ cursor: "pointer" }}
        >
          <div className={styles2.imageWrapper}>
            <img src={"/image/down.png"} alt={"add"} />
          </div>

          <div className={styles2.info}>
            <h3 className={styles2.title}>Descargar Productos</h3>
            <p className={styles2.price}>preparar descarga</p>
          </div>
        </button>

      </div>

      {/* MODAL */}
      {openModal && (
        <CreateProductModal onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
}
