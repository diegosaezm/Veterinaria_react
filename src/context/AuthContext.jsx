import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const SESSION_KEY = "sanmarcos_sesion";

// Recuperar la sesión al recargar la página
function recuperarSesion() {
  try {
    const datos = sessionStorage.getItem(SESSION_KEY);

    if (!datos) return null;

    const sesion = JSON.parse(datos);

    if (!sesion.token || !sesion.usuario) {
      return null;
    }

    // Comprobar si el JWT ya expiró
    const payload = JSON.parse(atob(sesion.token.split(".")[1]));

    if (!payload.exp || payload.exp * 1000 <= Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }

    return sesion;
  } catch (error) {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(recuperarSesion);

  // Guardar los datos obtenidos al iniciar sesión
  function iniciarSesion(respuesta) {
    const nuevaSesion = {
      token: respuesta.token,

      usuario: {
        id: respuesta.id,
        correo: respuesta.correo,
        rol: respuesta.rol,
      },
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nuevaSesion));

    setSesion(nuevaSesion);
  }

  // Eliminar la sesión
  function cerrarSesion() {
    sessionStorage.removeItem(SESSION_KEY);
    setSesion(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario: sesion?.usuario ?? null,
        token: sesion?.token ?? null,
        autenticado: Boolean(sesion),
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}
