import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, rolesPermitidos }) {
  const { autenticado, usuario } = useAuth();

  // Si no inició sesión, enviarlo al login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, comprobar su rol
  if (!rolesPermitidos.includes(usuario?.rol)) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3">Acceso restringido</h1>

        <p className="text-muted mt-3">
          Tu usuario no tiene permisos para acceder a esta sección.
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
    );
  }

  // Usuario autenticado y autorizado
  return children;
}

export default ProtectedRoute;
