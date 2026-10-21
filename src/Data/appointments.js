export function obtenerCitas() {
  const citasGuardadas = localStorage.getItem("citas");

  return JSON.parse(citasGuardadas) || [];
}

export function crearCita(nuevaCita) {
  const citasGuardadas = obtenerCitas();

  citasGuardadas.push(nuevaCita);

  localStorage.setItem("citas", JSON.stringify(citasGuardadas));
}

export function eliminarCita(index) {
  const citas = obtenerCitas();

  const nuevasCitas = citas.filter((_, i) => i !== index);

  localStorage.setItem("citas", JSON.stringify(nuevasCitas));

  return nuevasCitas;
}

export function actualizarCita(index, citaActualizada) {
  const citas = obtenerCitas();

  citas[index] = citaActualizada;

  localStorage.setItem("citas", JSON.stringify(citas));

  return citas;
}
