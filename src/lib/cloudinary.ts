export function cloudinaryUrl(src: string, width = 800, quality = 70) {
  // Si ya es una URL de Cloudinary, inyecta transformaciones
  // Ejemplo de Cloudinary: https://res.cloudinary.com/<cloud>/image/upload/v123/.../file.jpg
  if (!src) return src;
  try {
    const url = new URL(src);
    if (url.hostname.includes("res.cloudinary.com")) {
      // Inserta transformaciones después de /upload/
      return src.replace("/upload/", `/upload/w_${width},q_${quality},f_auto/`);
    }
  } catch (e) {
    // no es URL válida, devolver original
  }
  return src;
}
