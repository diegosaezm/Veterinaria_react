import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function Login() {
  const navigate = useNavigate();

  const { iniciarSesion, cerrarSesion, autenticado, usuario } = useAuth();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correo.trim(),
          contrasena,
        }),
      });

      if (!respuesta.ok) {
        if (respuesta.status === 401) {
          throw new Error("Correo o contraseña incorrectos.");
        }

        throw new Error("No fue posible iniciar sesión.");
      }

      const datos = await respuesta.json();

      if (!datos.token) {
        throw new Error("El servidor no devolvió un token.");
      }

      // Guardar JWT y usuario en AuthContext
      iniciarSesion(datos);

      // Redirigir después del login
      navigate("/productos", { replace: true });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  if (autenticado) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">Sesión iniciada</h1>

        <p>Bienvenido, {usuario?.correo}</p>

        <p>
          Rol: <strong>{usuario?.rol}</strong>
        </p>

        <button
          className="btn btn-outline-danger"
          onClick={() => {
            cerrarSesion();
            navigate("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "450px" }}>
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-4">Iniciar sesión</h1>

          <p className="text-muted text-center">Veterinaria San Marcos</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contrasena" className="form-label">
                Contraseña
              </label>

              <input
                id="contrasena"
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={cargando}
            >
              {cargando ? "Iniciando sesión..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
