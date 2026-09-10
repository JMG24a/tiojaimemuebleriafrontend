"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import styles2 from "./ProductCard.module.css";
import CreateProductModal from "./CreateProductModal";
import { useSesion } from "@/hooks/useSesion";
import { Product } from "@/types/product";

export default function ProductsGridClient({
  products,
  category,
  methodPay
}: {
  products: Product[];
  category: string;
  methodPay: { cashea: number };
}) {
  const [openModal, setOpenModal] = useState(false);
  const [openDownloadMenu, setOpenDownloadMenu] = useState(false);

  const activo = useSesion();

  function downloadDivisas() {
    const rows = products.map((p) => {
      const basePrice = Number(p.precio);

      return {
        id: p.id,
        category: p.category,
        modelo: p.modelo,
        precio: basePrice, // ← precio base sin cashea
        sku: p.sku,
        images: p.images,
        descripcion: p.descripcion
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    XLSX.writeFile(workbook, "productos-divisas.xlsx");
  }

  function downloadCashea() {
    const casheaPercent = Number(methodPay.cashea);
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

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    XLSX.writeFile(workbook, "productos.xlsx");
  }

  return (
    <>
      {/* Botón crear producto */}
      {activo &&
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
      }

      {/* Botón descargar Excel */}
      {activo &&
        <button
          className={styles2.card}
          onClick={() => setOpenDownloadMenu(true)}
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
      }


      {openDownloadMenu && (
        <div className={styles2.downloadMenu}>
          <div className={styles2.menuBox}>
            <h3>Selecciona el tipo de precio</h3>

            <button
              onClick={() => {
                downloadCashea();
                setOpenDownloadMenu(false);
              }}
              className={styles2.menuBtn}
            >
              Descargar en Cashea
            </button>

            <button
              onClick={() => {
                downloadDivisas();
                setOpenDownloadMenu(false);
              }}
              className={styles2.menuBtn}
            >
              Descargar en Divisas
            </button>

            <button
              onClick={() => setOpenDownloadMenu(false)}
              className={styles2.closeBtn}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}


      {/* Modal */}
      {openModal && (
        <CreateProductModal onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}
