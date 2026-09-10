"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUpdate() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLog([]);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
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
          const res = await fetch(`/api/products/${row.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error("Error actualizando");

          setLog(prev => [...prev, `✔ Producto actualizado: ${row.modelo}`]);

        } catch (err) {
          setLog(prev => [...prev, `❌ Error con ${row.modelo}: ${err}`]);
        }
      }

    } catch (err) {
      setLog(prev => [...prev, "❌ Error leyendo el archivo"]);
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

      {loading && <p>Actualizando productos...</p>}

      <div style={{ marginTop: "15px" }}>
        {log.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
