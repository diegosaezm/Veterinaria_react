import { apiFetch } from "./apiFetch";

export async function obtenerProductos() {
  return apiFetch("/api/v1/productos");
}
