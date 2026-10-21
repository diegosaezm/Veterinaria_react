
import { Link, useParams } from "react-router-dom";
import services from "../Data/services";

function ServiceDetail() {
  const { id } = useParams();

  const service = services.find(
    (service) => service.id === Number(id)
  );

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h2>Servicio no encontrado</h2>
        <p>No encontramos el servicio solicitado.</p>

        <Link to="/servicios" className="btn btn-primary mt-3">
          Volver a servicios
        </Link>
      </div>
    );
  }

  return (
    <section className="detalle-servicio py-5">
      <div className="container">

        <Link
          to="/servicios"
          className="btn btn-outline-primary mb-4"
        >
          ← Volver a servicios
        </Link>

        <div className="row align-items-center g-5">

          <div className="col-lg-6">
            <img
              src={service.imagen}
              alt={service.nombre}
              className="detalle-imagen"
            />
          </div>

          <div className="col-lg-6">
            <span className="detalle-etiqueta">
              🐾 Cuidado veterinario
            </span>

            <h1 className="detalle-titulo mt-4">
              {service.nombre}
            </h1>

            <p className="detalle-descripcion mt-4">
              {service.descripcion}
            </p>

            <div className="detalle-precio mt-4">
              <span>Valor del servicio</span>
              <h2>
                ${service.precio.toLocaleString("es-CL")}
              </h2>
            </div>

            <div className="detalle-beneficios mt-4">
              <p>✓ Atención personalizada</p>
              <p>✓ Cuidado y dedicación</p>
              <p>✓ Bienestar para tu mascota</p>
            </div>

            <Link
              to="/agendar"
              className="btn btn-primary btn-lg mt-3"
            >
              Agendar este servicio
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;
