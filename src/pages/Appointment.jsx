
import { useState } from "react";
import { Link } from "react-router-dom";
import { crearCita } from "../Data/appointments";
import services from "../Data/services";

function Appointment() {
  const [nombre, setNombre] = useState("");
  const [mascota, setMascota] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);

  // Fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  const fechaMinima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !mascota.trim() ||
      !servicio ||
      !fecha
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (fecha < fechaMinima) {
      alert("No puedes agendar una fecha anterior a hoy");
      return;
    }

    const nuevaCita = {
      nombre: nombre.trim(),
      mascota: mascota.trim(),
      servicio: servicio,
      fecha: fecha,
    };

    crearCita(nuevaCita);

    setNombre("");
    setMascota("");
    setServicio("");
    setFecha("");
    setConfirmacion(true);
  }

  return (
    <section className="agendar-seccion py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="detalle-etiqueta">
            🐾 Estamos para ayudarte
          </span>

          <h1 className="mt-4">
            Agenda una hora para tu mascota
          </h1>

          <p className="text-muted">
            Completa el formulario y registra una cita
            para tu compañero de cuatro patas.
          </p>
        </div>

        <div className="agendar-contenedor mx-auto">
          <div className="row g-0">

            <div className="col-lg-4 agendar-info">
              <h2 className="h3 text-white">
                Tu mascota merece lo mejor
              </h2>

              <p>
                Queremos acompañarte en el cuidado
                y bienestar de tu mascota.
              </p>

              <div className="mt-4">
                <p>✓ Atención cercana</p>
                <p>✓ Profesionales dedicados</p>
                <p>✓ Servicios para su bienestar</p>
              </div>

              <div className="agendar-icono mt-4">
                🐶 🐱
              </div>
            </div>

            <div className="col-lg-8 agendar-formulario">

              {confirmacion && (
                <div
                  className="alert alert-success"
                  role="status"
                >
                  ¡Tu cita fue registrada correctamente!
                  <div className="mt-2">
                    <Link to="/citas" className="alert-link">
                      Ver mis citas
                    </Link>
                  </div>
                </div>
              )}

              <h2 className="h4 mb-4">
                Datos de la reserva
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label
                      htmlFor="nombre"
                      className="form-label"
                    >
                      Nombre del dueño
                    </label>

                    <input
                      id="nombre"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Claudia"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        setConfirmacion(false);
                      }}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="mascota"
                      className="form-label"
                    >
                      Nombre de la mascota
                    </label>

                    <input
                      id="mascota"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Luna"
                      value={mascota}
                      onChange={(e) => {
                        setMascota(e.target.value);
                        setConfirmacion(false);
                      }}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="servicio"
                      className="form-label"
                    >
                      Servicio veterinario
                    </label>

                    <select
                      id="servicio"
                      className="form-select"
                      value={servicio}
                      onChange={(e) => {
                        setServicio(e.target.value);
                        setConfirmacion(false);
                      }}
                      required
                    >
                      <option value="">
                        Selecciona un servicio
                      </option>

                      {services.map((item) => (
                        <option
                          key={item.id}
                          value={item.nombre}
                        >
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="fecha"
                      className="form-label"
                    >
                      Fecha de atención
                    </label>

                    <input
                      id="fecha"
                      type="date"
                      className="form-control"
                      min={fechaMinima}
                      value={fecha}
                      onChange={(e) => {
                        setFecha(e.target.value);
                        setConfirmacion(false);
                      }}
                      required
                    />
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                    >
                      Confirmar agendamiento
                    </button>
                  </div>

                </div>
              </form>

              <p className="text-muted small mt-3 mb-0">
                Esta es una reserva de demostración.
                Los datos se almacenan localmente en
                este navegador.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
