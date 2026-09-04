"use client";

import { useState } from "react";
import styles from "./editProductModal.module.css";
import { Product } from "@/types/product";

export default function EditProductModal({
  product,
  images,
  onClose
}:{product: Product, images: string[], onClose: () => void}) {
  const [modelo, setModelo] = useState(product.modelo);
  const [precio, setPrecio] = useState(product.precio);
  const [descripcion, setDescripcion] = useState(product.descripcion);
  const [imageList, setImageList] = useState(images);

  function addImage(url: string) {
    setImageList([...imageList, url]);
  }

  function removeImage(index: number) {
    setImageList(imageList.filter((_, i) => i !== index));
  }

  function moveImage(from: number, to: number) {
    const updated = [...imageList];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setImageList(updated);
  }

  async function saveChanges() {
    const payload = {
      modelo,
      precio,
      descripcion,
      images: imageList.join("|")
    };

    await fetch(`/api/products/${product.sku}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar producto</h2>

        <label>Modelo</label>
        <input
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <label>Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrecio(Number(e.target.value))
          }
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label>Imágenes</label>
        <div className={styles.imagesGrid}>
          {imageList.map((url, index) => (
            <div key={index} className={styles.imageItem}>
              <img src={url} />

              <div className={styles.imageActions}>
                <button onClick={() => removeImage(index)}>Eliminar</button>

                {index > 0 && (
                  <button onClick={() => moveImage(index, index - 1)}>
                    ↑
                  </button>
                )}

                {index < imageList.length - 1 && (
                  <button onClick={() => moveImage(index, index + 1)}>
                    ↓
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.saveBtn} onClick={saveChanges}>
          Guardar cambios
        </button>

        <button className={styles.closeBtn} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
