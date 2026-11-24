import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import { Link } from "react-router-dom";
import AppointmentsList from "./pages/AppointmentsList";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/agendar" element={<Appointment />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/servicios/:id" element={<ServiceDetail />} />
        <Route path="/citas" element={<AppointmentsList />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
     </CartProvider>
  );
}

export default App;
