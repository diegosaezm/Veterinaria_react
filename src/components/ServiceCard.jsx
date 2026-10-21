import { Link } from "react-router-dom";

function ServiceCard({ id, nombre, precio, descripcion, imagen }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card servicio-card h-100 shadow-sm">
        {imagen && (
          <img
            src={imagen}
            className="card-img-top servicio-imagen"
            alt={nombre}
          />
        )}

        <div className="card-body d-flex flex-column p-4">
          <h3 className="card-title h4">{nombre}</h3>

          <p className="card-text text-muted">{descripcion}</p>

          <p className="fw-bold fs-5 mt-auto">
            ${precio.toLocaleString("es-CL")}
          </p>

          <Link to={`/servicios/${id}`} className="btn btn-outline-primary">
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
