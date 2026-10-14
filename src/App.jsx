import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import ServiceDetail from './pages/ServiceDetail'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/agendar" element={<Appointment />} />
        <Route path="/contacto" element={<Contact />} />
        <Route
          path="/servicios/:id"
          element={<ServiceDetail />}
        />
      </Routes>
    </>
  )
}

export default App