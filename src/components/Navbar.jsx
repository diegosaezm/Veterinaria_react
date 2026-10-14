import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Veterinaria San Marcos
        </Link>

        <div>
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/agendar">
                Agendar hora
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar