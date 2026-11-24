const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const CITAS_URL = `${API_URL}/api/v1/citas`;

// Procesar las respuestas del backend
async function procesarRespuesta(respuesta) {
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

// GET: obtener todas las citas
export async function obtenerCitas() {
  const respuesta = await fetch(CITAS_URL);
  return procesarRespuesta(respuesta);
}

// POST: crear una cita
export async function crearCita(cita) {
  const respuesta = await fetch(CITAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cita),
  });

  return procesarRespuesta(respuesta);
}

// PUT: actualizar una cita
export async function actualizarCita(id, cita) {
  const respuesta = await fetch(`${CITAS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cita),
  });

  return procesarRespuesta(respuesta);
}

// DELETE: eliminar una cita
export async function eliminarCita(id) {
  const respuesta = await fetch(`${CITAS_URL}/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta);
}
