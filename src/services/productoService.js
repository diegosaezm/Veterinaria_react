const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const PRODUCTOS_URL = `${API_URL}/api/v1/productos`;

// GET: Obtener productos desde Spring Boot
export async function obtenerProductos() {
  const respuesta = await fetch(PRODUCTOS_URL);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
}
