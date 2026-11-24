
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navigate = useNavigate();

  const { carrito, vaciarCarrito } = useCart();

  const {
    usuario,
    autenticado,
    cerrarSesion,
  } = useAuth();

  // Cantidad total de productos del carrito
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Roles
  const esAdministrador =
    usuario?.rol === "ADMINISTRADOR";

  const esVendedor =
    usuario?.rol === "VENDEDOR";

  const esCliente =
    usuario?.rol === "CLIENTE";

  // Permisos
  const puedeAgendar =
    esAdministrador || esCliente;

  const puedeComprar =
    esAdministrador || esCliente;

  const puedeVerVentas =
    esAdministrador || esVendedor;

  // Cerrar menú hamburguesa
  function cerrarMenu() {
    setMenuAbierto(false);
  }

  // Cerrar sesión
  function salir() {
    cerrarSesion();
    vaciarCarrito();
    cerrarMenu();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">

        {/* LOGO */}
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={cerrarMenu}
        >
          <span className="logo-veterinaria">
            🐾
          </span>

          <span>
            Veterinaria San Marcos
          </span>
        </NavLink>

        {/* MENÚ RESPONSIVO */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuAbierto}
          aria-controls="menuPrincipal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="menuPrincipal"
          className={`collapse navbar-collapse ${
            menuAbierto ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            {/* INICIO */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                end
                onClick={cerrarMenu}
              >
                Inicio
              </NavLink>
            </li>

            {/* SERVICIOS */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/servicios"
                onClick={cerrarMenu}
              >
                Servicios
              </NavLink>
            </li>

            {/* CONTACTO */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contacto"
                onClick={cerrarMenu}
              >
                Contacto
              </NavLink>
            </li>

            {/* PRODUCTOS: TODOS LOS ROLES */}
            {autenticado && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/productos"
                  onClick={cerrarMenu}
                >
                  Productos
                </NavLink>
              </li>
            )}

            {/* VENTAS: ADMINISTRADOR Y VENDEDOR */}
            {puedeVerVentas && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/ventas"
                  onClick={cerrarMenu}
                >
                  Ventas
                </NavLink>
              </li>
            )}

            {/* CITAS: SOLO ADMINISTRADOR */}
            {esAdministrador && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/citas"
                  onClick={cerrarMenu}
                >
                  Gestionar citas
                </NavLink>
              </li>
            )}

            {/* AGENDAR: ADMINISTRADOR Y CLIENTE */}
            {puedeAgendar && (
              <li className="nav-item mt-2 mt-lg-0">
                <NavLink
                  className="btn btn-primary ms-lg-2"
                  to="/agendar"
                  onClick={cerrarMenu}
                >
                  Agendar hora
                </NavLink>
              </li>
            )}

            {/* CARRITO: ADMINISTRADOR Y CLIENTE */}
            {puedeComprar && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/carrito"
                  onClick={cerrarMenu}
                >
                  🛒 Carrito ({cantidadTotal})
                </NavLink>
              </li>
            )}

            {/* INICIAR SESIÓN */}
            {!autenticado && (
              <li className="nav-item mt-2 mt-lg-0">
                <NavLink
                  className="btn btn-primary ms-lg-2"
                  to="/login"
                  onClick={cerrarMenu}
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}

            {/* INFORMACIÓN DEL USUARIO */}
            {autenticado && (
              <>
                <li className="nav-item ms-lg-2">
                  <div
                    className="d-flex flex-column px-2"
                    title={usuario?.correo}
                  >
                    <small
                      className="fw-bold text-truncate"
                      style={{ maxWidth: "150px" }}
                    >
                      {usuario?.correo}
                    </small>

                    <small className="text-muted">
                      {usuario?.rol}
                    </small>
                  </div>
                </li>

                {/* CERRAR SESIÓN */}
                <li className="nav-item mt-2 mt-lg-0">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={salir}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
