
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { registrarCompra } from "../services/compraService";

function Cart() {
  const {
    carrito,
    agregarAlCarrito,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCart();

  const [comprando, setComprando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const totalCompra = carrito.reduce(
    (total, p) => total + p.precio * p.cantidad,
    0
  );

  // POST: Registrar la compra en Spring Boot
  async function finalizarCompra() {
    if (carrito.length === 0 || comprando) return;

    setComprando(true);
    setMensaje("");
    setError("");

    try {
      // Enviar los productos y cantidades al backend
      const compraGuardada = await registrarCompra(carrito);

      console.log("Compra registrada en MySQL:", compraGuardada);

      // Mostrar los datos reales devueltos por Spring Boot
      setMensaje(
        `¡Compra #${compraGuardada.id} registrada correctamente! ` +
        `Total: $${compraGuardada.total.toLocaleString("es-CL")}`
      );

      // Vaciar solamente después de confirmar la compra
      vaciarCarrito();

    } catch (err) {
      console.error("Error al registrar compra:", err);

      setError(
        err.message || "No fue posible registrar la compra."
      );

    } finally {
      setComprando(false);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Mi carrito
      </h1>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {carrito.length === 0 ? (
        <p className="text-center">
          Tu carrito está vacío
        </p>
      ) : (
        <div className="row g-3">
          {carrito.map((p) => (
            <div className="col-12" key={p.id}>
              <div className="card p-3 shadow-sm">
                <h4>{p.nombre}</h4>

                <p>
                  Precio: ${p.precio.toLocaleString("es-CL")}
                </p>

                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => disminuirCantidad(p.id)}
                    disabled={comprando}
                  >
                    -
                  </button>

                  <span>
                    Cantidad: {p.cantidad}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => agregarAlCarrito(p.id)}
                    disabled={comprando || p.cantidad >= p.stock}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger ms-auto"
                    onClick={() => eliminarDelCarrito(p.id)}
                    disabled={comprando}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {carrito.length > 0 && (
        <div className="card p-4 mt-4 shadow-sm">
          <h3 className="text-end">
            Total: ${totalCompra.toLocaleString("es-CL")}
          </h3>

          <button
            type="button"
            className="btn btn-outline-danger mt-3"
            onClick={vaciarCarrito}
            disabled={comprando}
          >
            Vaciar carrito
          </button>

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={finalizarCompra}
            disabled={comprando}
          >
            {comprando
              ? "Procesando compra..."
              : "Finalizar compra"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
