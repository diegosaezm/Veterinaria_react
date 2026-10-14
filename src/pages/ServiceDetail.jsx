import { useParams } from 'react-router-dom'
import services from '../Data/services'

function ServiceDetail() {
  const { id } = useParams()

  const service = services.find(
    (service) => service.id === Number(id)
  )

  if (!service) {
    return (
      <div className="container py-5">
        <h2>Servicio no encontrado</h2>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1>{service.nombre}</h1>

      <p>{service.descripcion}</p>

      <p className="fw-bold">
        ${service.precio.toLocaleString('es-CL')}
      </p>
    </div>
  )
}

export default ServiceDetail