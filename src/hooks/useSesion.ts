'use client';

import { useEffect, useState } from "react";

export function useSesion() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const sesion = localStorage.getItem("sesion_activa");
    setActivo(sesion === "activo");
  }, []);

  return activo;
}
