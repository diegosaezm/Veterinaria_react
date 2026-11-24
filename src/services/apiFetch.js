const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function apiFetch(ruta, opciones = {}) {
  let token = null;

  try {
    const sesion = JSON.parse(sessionStorage.getItem("sanmarcos_sesion"));

    token = sesion?.token ?? null;
  } catch {
    token = null;
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      ...(opciones.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  if (!respuesta.ok) {
    if (respuesta.status === 401) {
      throw new Error("Debes iniciar sesión.");
    }

    if (respuesta.status === 403) {
      throw new Error("No tienes permisos para esta operación.");
    }

    if (respuesta.status === 409) {
      throw new Error("Conflicto: revisa el stock disponible.");
    }

    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}
