import { apiFetch } from "./apiFetch";

// GET: Listar citas
export async function obtenerCitas() {
  return apiFetch("/api/v1/citas");
}

// POST: Crear cita
export async function crearCita(cita) {
  return apiFetch("/api/v1/citas", {
    method: "POST",
    body: JSON.stringify(cita),
  });
}

// PUT: Actualizar cita
export async function actualizarCita(id, cita) {
  return apiFetch(`/api/v1/citas/${id}`, {
    method: "PUT",
    body: JSON.stringify(cita),
  });
}

// DELETE: Eliminar cita
export async function eliminarCita(id) {
  return apiFetch(`/api/v1/citas/${id}`, {
    method: "DELETE",
  });
}
