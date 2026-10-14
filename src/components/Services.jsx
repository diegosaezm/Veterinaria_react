import services from "../Data/services";
import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Nuestros servicios</h2>

        <p className="text-muted">
          Atención pensada para cada etapa de la vida de tu mascota.
        </p>
      </div>

      <div className="row g-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            nombre={service.nombre}
            precio={service.precio}
            descripcion={service.descripcion}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;
