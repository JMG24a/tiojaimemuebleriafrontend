'use client';

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUpload() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLog([]);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      for (const row of rows as any[]) {
        const payload = {
          category: row.category,
          modelo: row.modelo,
          precio: Number(row.precio),
          sku: row.sku,
          images: row.images,
          descripcion: row.descripcion
        };

        try {
          const res = await fetch("https://tjm-web-back.onrender.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error("Error al crear producto");

          setLog((prev) => [...prev, `✔ Producto creado: ${payload.modelo}`]);

        } catch (err) {
          setLog((prev) => [
            ...prev,
            `❌ Error creando ${payload.modelo}: ${err}`
          ]);
        }
      }
    } catch (err) {
      setLog((prev) => [...prev, "❌ Error leyendo el archivo"]);
    }

    setLoading(false);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleUpload}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}
      />

      {loading && <p>Subiendo productos...</p>}

      <div style={{ marginTop: "15px" }}>
        {log.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
