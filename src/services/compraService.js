import { apiFetch } from "./apiFetch";

// POST: Registrar una compra
export async function registrarCompra(carrito) {
  const productos = carrito.map((producto) => ({
    productoId: producto.id,
    cantidad: producto.cantidad,
  }));

  return apiFetch("/api/v1/compras", {
    method: "POST",
    body: JSON.stringify({ productos }),
  });
}

// GET: Consultar las compras registradas
// Permitido para ADMINISTRADOR y VENDEDOR
export async function obtenerCompras() {
  return apiFetch("/api/v1/compras");
}
