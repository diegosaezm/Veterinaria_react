
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={cerrarMenu}
        >
          <span className="logo-veterinaria">🐾</span>
          <span>Veterinaria San Marcos</span>
        </NavLink>

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
          className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/servicios" onClick={cerrarMenu}>
                Servicios
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/citas" onClick={cerrarMenu}>
                Mis citas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto" onClick={cerrarMenu}>
                Contacto
              </NavLink>
            </li>

            <li className="nav-item mt-2 mt-lg-0">
              <NavLink
                className="btn btn-primary ms-lg-2"
                to="/agendar"
                onClick={cerrarMenu}
              >
                Agendar hora
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
