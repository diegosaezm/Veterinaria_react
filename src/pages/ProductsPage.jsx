
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { obtenerProductos } from "../services/productoService";

function ProductsPage() {
  const { agregarAlCarrito } = useCart();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // GET: Obtener productos desde Spring Boot
  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();

        if (activo) {
          setProductos(datos);
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);

        if (activo) {
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Nuestros productos
      </h1>

      {cargando ? (
        <p className="text-center">
          Cargando productos...
        </p>
      ) : error ? (
        <div className="alert alert-danger">
          {error}
        </div>
      ) : productos.length === 0 ? (
        <p className="text-center">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="row g-4">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              descripcion={producto.descripcion}
              imagen={producto.imagen}
              stock={producto.stock}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
