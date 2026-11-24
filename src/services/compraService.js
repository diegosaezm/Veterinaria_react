const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const COMPRAS_URL = `${API_URL}/api/v1/compras`;

// POST: Registrar una compra en Spring Boot
export async function registrarCompra(carrito) {
  // Enviamos únicamente el ID y la cantidad
  const productos = carrito.map((producto) => ({
    productoId: producto.id,
    cantidad: producto.cantidad,
  }));

  const respuesta = await fetch(COMPRAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productos }),
  });

  if (!respuesta.ok) {
    if (respuesta.status === 409) {
      throw new Error("Stock insuficiente para completar la compra.");
    }

    throw new Error(
      `No se pudo registrar la compra. Error HTTP: ${respuesta.status}`,
    );
  }

  return respuesta.json();
}
