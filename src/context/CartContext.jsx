import { createContext, useState, useContext, useEffect } from "react";
import { obtenerProductos } from "../services/productoService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  // GET: Cargar productos desde Spring Boot y MySQL
  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();

        if (activo) {
          setProductos(datos);
        }
      } catch (error) {
        console.error("Error al cargar productos del carrito:", error);
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  // Agregar productos al carrito
  function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);

    if (!producto || producto.stock <= 0) return;

    setCarrito((carritoAnterior) => {
      const existe = carritoAnterior.find((p) => p.id === id);

      if (existe) {
        if (existe.cantidad >= producto.stock) {
          return carritoAnterior;
        }

        return carritoAnterior.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p,
        );
      }

      return [...carritoAnterior, { ...producto, cantidad: 1 }];
    });
  }

  // Eliminar completamente un producto
  function eliminarDelCarrito(id) {
    setCarrito((carritoAnterior) => carritoAnterior.filter((p) => p.id !== id));
  }

  // Disminuir una unidad
  function disminuirCantidad(id) {
    setCarrito((carritoAnterior) =>
      carritoAnterior
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0),
    );
  }

  // Vaciar el carrito
  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        disminuirCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
