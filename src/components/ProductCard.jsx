function ProductCard({
  id,
  nombre,
  precio,
  descripcion,
  imagen,
  agregarAlCarrito,
}) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        {imagen && (
          <img
            src={imagen}
            className="card-img-top producto-imagen"
            alt={nombre}
          />
        )}

        <div className="card-body d-flex flex-column p-4">
          <h3 className="card-title h4">{nombre}</h3>

          <p className="card-text text-muted">{descripcion}</p>

          <p className="fw-bold fs-5 mt-auto">
            ${precio.toLocaleString("es-CL")}
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => agregarAlCarrito(id)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
