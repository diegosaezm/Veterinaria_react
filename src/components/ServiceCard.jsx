import { Link } from 'react-router-dom'

function ServiceCard({ id, nombre, precio, descripcion }) {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">
          <h3 className="card-title h5">
            {nombre}
          </h3>

          <p className="card-text">
            {descripcion}
          </p>

          <p className="fw-bold">
            ${precio.toLocaleString('es-CL')}
          </p>

          <Link
            to={`/servicios/${id}`}
            className="btn btn-outline-primary"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard