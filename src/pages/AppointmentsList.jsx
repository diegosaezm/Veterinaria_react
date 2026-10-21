
import { useState } from "react";
import { Link } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

import {
  obtenerCitas,
  eliminarCita as eliminarCitaGuardada,
  actualizarCita,
} from "../Data/appointments";

function AppointmentsList() {
  // Estados
  const [citas, setCitas] = useState(() => obtenerCitas());
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [mascotaEditada, setMascotaEditada] = useState("");
  const [servicioEditado, setServicioEditado] = useState("");
  const [fechaEditada, setFechaEditada] = useState("");

  // DELETE: Eliminar una cita
  function eliminarCita(index) {
    const nuevasCitas = eliminarCitaGuardada(index);
    setCitas(nuevasCitas);
    setEditandoIndex(null);
  }

  // Activar el formulario de edición
  function comenzarEdicion(index) {
    const cita = citas[index];

    setEditandoIndex(index);
    setNombreEditado(cita.nombre);
    setMascotaEditada(cita.mascota);
    setServicioEditado(cita.servicio);
    setFechaEditada(cita.fecha);
  }

  // UPDATE: Guardar los cambios
  function guardarEdicion() {
    if (
      !nombreEditado.trim() ||
      !mascotaEditada.trim() ||
      !servicioEditado.trim() ||
      !fechaEditada
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    const citaActualizada = {
      nombre: nombreEditado.trim(),
      mascota: mascotaEditada.trim(),
      servicio: servicioEditado.trim(),
      fecha: fechaEditada,
    };

    const nuevasCitas = actualizarCita(
      editandoIndex,
      citaActualizada
    );

    setCitas(nuevasCitas);
    setEditandoIndex(null);
  }

  return (
    <section className="citas-seccion py-5">
      <div className="container">

        <div className="text-center mb-5">
          <span className="detalle-etiqueta">
            🐾 Tus reservas
          </span>

          <h1 className="mt-4">
            Mis citas agendadas
          </h1>

          <p className="text-muted">
            Revisa, modifica o elimina las citas
            registradas para tus mascotas.
          </p>

          <Link
            to="/agendar"
            className="btn btn-primary mt-2"
          >
            + Agendar nueva cita
          </Link>
        </div>

        {citas.length === 0 ? (
          <div className="citas-vacio mx-auto text-center">
            <div className="citas-vacio-icono">
              🐶
            </div>

            <h2 className="h4">
              Todavía no tienes citas agendadas
            </h2>

            <p className="text-muted">
              Puedes registrar tu primera cita
              desde nuestro formulario.
            </p>

            <Link
              to="/agendar"
              className="btn btn-primary mt-2"
            >
              Agendar una hora
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {citas.map((cita, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={index}
              >
                <div className="card cita-card h-100">

                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">

                      <div className="cita-icono">
                        🐾
                      </div>

                      <span className="cita-estado">
                        Registrada
                      </span>
                    </div>

                    <h2 className="h4 cita-nombre mb-4">
                      {cita.mascota}
                    </h2>

                    <div className="cita-datos">
                      <p>
                        <strong>Dueño:</strong>{" "}
                        {cita.nombre}
                      </p>

                      <p>
                        <strong>Servicio:</strong>{" "}
                        {cita.servicio}
                      </p>

                      <p>
                        <strong>Fecha:</strong>{" "}
                        {cita.fecha}
                      </p>
                    </div>

                    <div className="cita-acciones d-flex gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary flex-fill"
                        onClick={() => comenzarEdicion(index)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger flex-fill"
                        onClick={() => eliminarCita(index)}
                      >
                        Eliminar
                      </button>
                    </div>

                    {editandoIndex === index && (
                      <div className="cita-edicion mt-4">

                        <h3 className="h5 mb-3">
                          Editar reserva
                        </h3>

                        <label className="form-label">
                          Nombre del dueño
                        </label>

                        <input
                          type="text"
                          className="form-control mb-3"
                          value={nombreEditado}
                          onChange={(e) =>
                            setNombreEditado(e.target.value)
                          }
                          placeholder="Nombre del dueño"
                        />

                        <label className="form-label">
                          Nombre de la mascota
                        </label>

                        <input
                          type="text"
                          className="form-control mb-3"
                          value={mascotaEditada}
                          onChange={(e) =>
                            setMascotaEditada(e.target.value)
                          }
                          placeholder="Nombre de la mascota"
                        />

                        <label className="form-label">
                          Servicio
                        </label>

                        <input
                          type="text"
                          className="form-control mb-3"
                          value={servicioEditado}
                          onChange={(e) =>
                            setServicioEditado(e.target.value)
                          }
                          placeholder="Servicio"
                        />

                        <label className="form-label">
                          Fecha
                        </label>

                        <input
                          type="date"
                          className="form-control mb-3"
                          value={fechaEditada}
                          onChange={(e) =>
                            setFechaEditada(e.target.value)
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-success w-100"
                          onClick={guardarEdicion}
                        >
                          Guardar cambios
                        </button>

                        <button
                          type="button"
                          className="btn btn-link w-100 mt-2"
                          onClick={() => setEditandoIndex(null)}
                        >
                          Cancelar
                        </button>

                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default AppointmentsList;
