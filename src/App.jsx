import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import AppointmentsList from "./pages/AppointmentsList";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Ventas from "./pages/Ventas";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/servicios/:id" element={<ServiceDetail />} />

        {/* Autenticacion */}
        <Route path="/login" element={<Login />} />

        {/* Todos los usuarios autenticados */}
        <Route
          path="/productos"
          element={
            <ProtectedRoute
              rolesPermitidos={["ADMINISTRADOR", "VENDEDOR", "CLIENTE"]}
            >
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        {/* Administrador y cliente */}
        <Route
          path="/agendar"
          element={
            <ProtectedRoute rolesPermitidos={["ADMINISTRADOR", "CLIENTE"]}>
              <Appointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute rolesPermitidos={["ADMINISTRADOR", "CLIENTE"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Solo administrador */}
        <Route
          path="/citas"
          element={
            <ProtectedRoute rolesPermitidos={["ADMINISTRADOR"]}>
              <AppointmentsList />
            </ProtectedRoute>
          }
        />

        {/* Administrador y vendedor */}
        <Route
          path="/ventas"
          element={
            <ProtectedRoute rolesPermitidos={["ADMINISTRADOR", "VENDEDOR"]}>
              <Ventas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
