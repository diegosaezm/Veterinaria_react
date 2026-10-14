function Hero() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">
            Cuidamos a tu mascota como parte de nuestra familia
          </h1>

          <p className="lead mt-3">
            Atención veterinaria cercana, profesional y pensada para el bienestar
            de tu mascota.
          </p>

          <button className="btn btn-primary btn-lg mt-3">
            Agendar hora
          </button>
        </div>

        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d"
            alt="Perro en atención veterinaria"
            className="img-fluid rounded shadow"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero