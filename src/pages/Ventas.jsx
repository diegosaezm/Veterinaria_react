import { useEffect, useState } from "react";
import { obtenerCompras } from "../services/compraService";

const formatoPrecio = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function formatearFecha(fecha) {
  if (!fecha) return "Sin fecha";

  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return fecha;
  }

  return fechaConvertida.toLocaleString("es-CL", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarVentas() {
      try {
        const datos = await obtenerCompras();

        if (!Array.isArray(datos)) {
          throw new Error("El servidor no devolvió una lista de compras.");
        }

        if (activo) {
          // Mostrar primero las compras más recientes
          const ventasOrdenadas = [...datos].sort((a, b) => b.id - a.id);

          setVentas(ventasOrdenadas);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarVentas();

    return () => {
      activo = false;
    };
  }, []);

  const totalRecaudado = ventas.reduce(
    (total, venta) => total + Number(venta.total || 0),
    0,
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-3">Panel de ventas</h1>

      <p className="text-center text-muted mb-4">
        Consulta de compras registradas en la base de datos
      </p>

      {cargando && (
        <div className="text-center">
          <p>Cargando ventas...</p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="text-muted">Compras registradas</h5>

                  <h2 className="fw-bold">{ventas.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="text-muted">Total vendido</h5>

                  <h2 className="fw-bold">
                    {formatoPrecio.format(totalRecaudado)}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {ventas.length === 0 ? (
            <div className="alert alert-info text-center">
              Todavía no hay compras registradas.
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="h5 mb-3">Historial de compras</h3>

                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ID compra</th>
                        <th>Fecha</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {ventas.map((venta) => (
                        <tr key={venta.id}>
                          <td>#{venta.id}</td>

                          <td>{formatearFecha(venta.fecha)}</td>

                          <td className="text-end fw-semibold">
                            {formatoPrecio.format(Number(venta.total || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Ventas;
