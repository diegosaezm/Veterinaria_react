import { useState } from "react";

function Appointment() {
  const [nombre, setNombre] = useState("");
  const [mascota, setMascota] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const nuevaCita = {
      nombre: nombre,
      mascota: mascota,
      servicio: servicio,
      fecha: fecha,
    };

    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

    citasGuardadas.push(nuevaCita);

    localStorage.setItem("citas", JSON.stringify(citasGuardadas));

    console.log(citasGuardadas);
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Agendar hora</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre del dueño</label>

          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de la mascota</label>

          <input
            type="text"
            className="form-control"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Servicio</label>

          <select
            className="form-select"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
          >
            <option value="">Selecciona un servicio</option>
            <option value="Consulta general">Consulta general</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Peluquería">Peluquería</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>

          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Agendar hora
        </button>
      </form>
    </div>
  );
}

export default Appointment;
