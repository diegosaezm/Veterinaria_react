
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
    recargarProductos,
  } = useCart();

  const [comprando, setComprando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  // Calcular el total mostrado en React
  const totalCompra = carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );

  // POST: Registrar la compra en Spring Boot
  async function finalizarCompra() {
    if (carrito.length === 0 || comprando) return;

    setComprando(true);
    setMensaje("");
    setError("");
    setAviso("");

    try {
      // 1. Enviar los productos al backend
      const compraGuardada = await registrarCompra(carrito);

      console.log(
        "Compra registrada en MySQL:",
        compraGuardada
      );

      // 2. La compra ya fue confirmada por Spring Boot
      vaciarCarrito();

      setMensaje(
        `¡Compra #${compraGuardada.id} registrada correctamente! ` +
        `Total: $${compraGuardada.total.toLocaleString("es-CL")}`
      );

      // 3. Sincronizar el inventario con MySQL
      try {
        await recargarProductos();

      } catch (errorInventario) {
        console.error(
          "Error al actualizar el inventario:",
          errorInventario
        );

        // La compra fue exitosa aunque falle esta consulta
        setAviso(
          "La compra fue registrada, pero no se pudo " +
          "actualizar el inventario mostrado. " +
          "Recarga la página para consultar el stock."
        );
      }

    } catch (err) {
      console.error(
        "Error al registrar la compra:",
        err
      );

      // Si el POST falla, conservamos el carrito
      setError(
        err.message ||
        "No fue posible registrar la compra."
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

      {/* Confirmación de compra */}
      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {/* Error al registrar la compra */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Error al sincronizar inventario */}
      {aviso && (
        <div className="alert alert-warning" role="status">
          {aviso}
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
                  Precio: $
                  {p.precio.toLocaleString("es-CL")}
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
                    disabled={
                      comprando ||
                      p.cantidad >= p.stock
                    }
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
            Total: $
            {totalCompra.toLocaleString("es-CL")}
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
