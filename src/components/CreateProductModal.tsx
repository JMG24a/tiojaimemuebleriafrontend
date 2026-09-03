'use client';

import { useState } from "react";
import styles from "./createProductModal.module.css";
import ExcelUpload from "./ExcelUpload";

export default function CreateProductModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    modelo: "",
    precio: "",
    sku: "",
    images: "", // url|url|url
    descripcion: ""
  });

  const [imageList, setImageList] = useState<string[]>([]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function uploadImage(file: File) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmajdkimk/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const json = await res.json();
    return json.secure_url;
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);

    const updated = [...imageList, url];
    setImageList(updated);

    // Convertimos a url|url|url
    setForm({
      ...form,
      images: updated.join("|")
    });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const payload = {
        category: form.category,
        modelo: form.modelo,
        precio: Number(form.precio),
        sku: form.sku,
        images: form.images,
        descripcion: form.descripcion
      };

      const res = await fetch("https://tjm-web-back.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al crear el producto");

      alert("Producto creado correctamente");
      onClose();

    } catch (err) {
      alert("Hubo un error al crear el producto");
      console.error(err);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear producto</h2>

        <label className={styles.label}>Categoría</label>
        <input
          name="category"
          className={styles.input}
          value={form.category}
          onChange={handleChange}
        />

        <label className={styles.label}>Modelo</label>
        <input
          name="modelo"
          className={styles.input}
          value={form.modelo}
          onChange={handleChange}
        />

        <label className={styles.label}>Precio</label>
        <input
          name="precio"
          type="number"
          className={styles.input}
          value={form.precio}
          onChange={handleChange}
        />

        <label className={styles.label}>SKU</label>
        <input
          name="sku"
          className={styles.input}
          value={form.sku}
          onChange={handleChange}
        />

        <label className={styles.label}>Imágenes</label>

        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleImageSelect}
        />

        {/* PREVIEW */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {imageList.map((url, i) => (
            <img
              key={i}
              src={url}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #ccc"
              }}
            />
          ))}
        </div>

        <label className={styles.label}>Descripción</label>
        <textarea
          name="descripcion"
          className={styles.textarea}
          value={form.descripcion}
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>

          <button
            className={styles.save}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar producto"}
          </button>

        </div>
        <div className={styles.excel}>
          <h3>Carga Masiva</h3>
          <ExcelUpload />
        </div>
      </div>
    </div>
  );
}
