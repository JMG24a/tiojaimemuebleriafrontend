'use client';

import { useState } from "react";
import ProductHero from "@/components/ProductHero";

export default function LoginPage() {
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (clave === "Tjm.catalog.26") {
      localStorage.setItem("sesion_activa", "activo");
      window.location.href = "/admin"; // redirige a donde quieras
    } else {
      setError("Clave incorrecta");
    }
  }

  return (
    <>
      <ProductHero category={"muebles"} />

      <div style={{ padding: "40px", color: "#444" }}>
        <h1>Acceso</h1>

        <form onSubmit={handleLogin} style={{ marginTop: "20px"}}>
          <input
            type="password"
            placeholder="Ingresa la clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #444",
            }}
          />

          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              background: "#333",
              color: "#fff",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
    </>
  );
}
