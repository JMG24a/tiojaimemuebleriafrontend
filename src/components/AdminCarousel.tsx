'use client';

import { useEffect, useRef, useState } from "react";

export default function AdminCarousel() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentEdit, setCurrentEdit] = useState<{ id: number | null; field: string | null }>({
    id: null,
    field: null,
  });

  // ============================
  // 1. Verificar sesión
  // ============================
  useEffect(() => {
    const sesion = localStorage.getItem("sesion_activa");
    if (sesion !== "activo") {
      window.location.href = "/login";
    }
  }, []);

  // ============================
  // 2. Cargar sliders
  // ============================
  async function loadCarousel() {
    const res = await fetch("https://tjm-web-back.onrender.com/core/carrusel", {
      cache: "no-store",
    });
    const data = await res.json();
    setSliders(data);
  }

  useEffect(() => {
    loadCarousel();
  }, []);

  // ============================
  // 3. Abrir input
  // ============================
  function triggerUpload(id: number, field: string) {
    setCurrentEdit({ id, field });
    fileInputRef.current?.click();
  }

  // ============================
  // 4. Subir a Cloudinary
  // ============================
  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const cloudRes = await fetch(
      // "https://api.cloudinary.com/v1_1/dmajdkimk/image/upload",
      "https://api.cloudinary.com/v1_1/rgqgfmc8/image/upload", // second account
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudData = await cloudRes.json();
    return cloudData.secure_url;
  }

  // ============================
  // 5. PATCH al backend
  // ============================
  async function updateBackend(url: string) {
    if (!currentEdit.id || !currentEdit.field) return;

    const body: any = {};
    body[currentEdit.field] = url;

    await fetch(`https://tjm-web-back.onrender.com/core/carrusel/${currentEdit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  // ============================
  // 6. Handler del input
  // ============================
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadToCloudinary(file);
      await updateBackend(url);
      await loadCarousel();
    } catch (err) {
      console.error("Error actualizando imagen:", err);
    }

    setLoading(false);
    e.target.value = "";
  }

  return (
    <>
      <div style={{ padding: "0px", color: "#444" }}>

        {loading && <p style={{ color: "blue" }}>Actualizando imagen...</p>}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Grupo</th>
              <th>Mobile</th>
              <th>Tablet</th>
              <th>Desktop</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((slider) => (
              <tr key={slider.id}>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  {slider.group}
                </td>

                {["mobile", "tablet", "desktop"].map((field) => (
                  <td key={field} style={{ padding: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <img
                        src={slider[field]}
                        alt={field}
                        style={{
                          width: "150px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                        }}
                      />

                      <button
                        onClick={() => triggerUpload(slider.id, field)}
                        style={{
                          padding: "8px 12px",
                          background: "#333",
                          color: "#fff",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Cambiar
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Input oculto */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}
