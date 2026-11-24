import { createContext, useState, useContext, useEffect } from "react";

import { obtenerProductos } from "../services/productoService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useAuth();

  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);

  // Sincronizar productos y stock con MySQL
  function actualizarInventario(datos) {
    setProductos(datos);

    setCarrito((carritoAnterior) =>
      carritoAnterior
        .map((productoCarrito) => {
          const productoActualizado = datos.find(
            (p) => p.id === productoCarrito.id,
          );

          if (!productoActualizado || productoActualizado.stock <= 0) {
            return null;
          }

          return {
            ...productoActualizado,
            cantidad: Math.min(
              productoCarrito.cantidad,
              productoActualizado.stock,
            ),
          };
        })
        .filter(Boolean),
    );
  }

  // Cargar productos al iniciar sesion
  useEffect(() => {
    let activo = true;

    if (!token) {
      setProductos([]);
      setCarrito([]);
      setCargandoProductos(false);

      return () => {
        activo = false;
      };
    }

    async function cargarProductos() {
      setCargandoProductos(true);

      try {
        const datos = await obtenerProductos();

        if (activo) {
          actualizarInventario(datos);
        }
      } catch (error) {
        if (activo) {
          console.error("Error al cargar productos del carrito:", error);
          setProductos([]);
        }
      } finally {
        if (activo) {
          setCargandoProductos(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, [token]);

  // Volver a consultar el inventario despues de una compra
  async function recargarProductos() {
    if (!token) return [];

    const datos = await obtenerProductos();
    actualizarInventario(datos);

    return datos;
  }

  // Agregar un producto al carrito
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

  // Disminuir cantidad
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
        productos,
        cargandoProductos,
        agregarAlCarrito,
        eliminarDelCarrito,
        disminuirCantidad,
        vaciarCarrito,
        recargarProductos,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
