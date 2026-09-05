'use client';

import { useEffect, useState } from "react";

export default function MetodosAdmin() {
  const [metodos, setMetodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  // 2. Cargar métodos
  // ============================
  async function loadMetodos() {
    const ids = [1, 2, 3, 4];

    const responses = await Promise.all(
      ids.map(id =>
        fetch(`https://tjm-web-back.onrender.com/core/${id}`, {
          cache: "no-store"
        }).then(r => r.json())
      )
    );

    const data = responses.map((item, index) => ({
      id: index + 1,
      nombre:
        index === 0
          ? "Cashea"
          : index === 1
          ? "Decontado"
          : index === 2
          ? "Zelle"
          : "Cash - Binance",
      precio: item.precio
    }));

    setMetodos(data);
  }

  useEffect(() => {
    loadMetodos();
  }, []);

  // ============================
  // 3. Guardar cambios
  // ============================
  async function guardarMetodo(id: number, nuevoPrecio: number) {
    setLoading(true);

    try {
      const body = { id, precio: Number(nuevoPrecio) };

      const response = await fetch(
        `https://tjm-web-back.onrender.com/core`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      await response.json();

      await loadMetodos();
      alert("Porcentaje actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando porcentaje:", error);
      alert("Error al guardar el porcentaje");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "0px", color: "wheat", background: "#013565"}}>
      {loading && <p style={{ color: "wheat" }}>Guardando cambios...</p>}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead>
          <tr>
            <th>Método</th>
            <th>Porcentaje</th>
            <th>Nuevo</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {metodos.map((m) => (
            <tr key={m.id}>
              <td style={{ padding: "10px", fontWeight: "bold" }}>
                {m.nombre}
              </td>

              <td style={{ padding: "10px" }}>{m.precio}%</td>

              <td style={{ padding: "10px" }}>
                <input
                  type="number"
                  defaultValue={m.precio}
                  id={`input-${m.id}`}
                  style={{
                    padding: "8px",
                    width: "120px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                  }}
                />
              </td>

              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => {
                    const nuevo = (
                      document.getElementById(
                        `input-${m.id}`
                      ) as HTMLInputElement
                    ).value;

                    guardarMetodo(m.id, Number(nuevo));
                  }}
                  style={{
                    padding: "8px 12px",
                    background: "#333",
                    color: "#fff",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
