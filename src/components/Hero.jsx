import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-principal">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="hero-etiqueta">
              🐾 Cuidamos a quienes más amas
            </span>

            <h1 className="hero-titulo mt-4">
              Su bienestar es nuestra prioridad.
            </h1>

            <p className="hero-descripcion mt-4">
              En Veterinaria San Marcos cuidamos a tus mascotas con atención
              cercana, dedicación y cariño. Porque son parte de tu familia,
              también son parte de la nuestra.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/agendar" className="btn btn-primary btn-lg">
                Agendar una hora
              </Link>

              <Link to="/servicios" className="btn btn-outline-primary btn-lg">
                Conocer servicios
              </Link>
            </div>

            <div className="hero-beneficios mt-5">
              <span>✓ Atención cercana</span>
              <span>✓ Cuidado profesional</span>
              <span>✓ Amor por los animales</span>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-imagen-contenedor">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&auto=format&fit=crop&q=85"
                alt="Perro golden retriever"
                className="hero-imagen"
              />

              <div className="hero-mensaje">
                <span>❤️</span>
                <div>
                  <strong>Su salud nos importa</strong>
                  <small>Una atención llena de cariño</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
