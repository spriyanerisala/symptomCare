/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import AISymptomChecker from './pages/AISymptomChecker'
import AppointmentSuccess from "./pages/AppointmentSuccess";
import Navbar from "./components/Navbar";
import Appointments from "./pages/getAppointments";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/ai-symptoms" element={<AISymptomChecker />} />
        <Route path="/appointment-success" element={<AppointmentSuccess />} />
        <Route path="/get-appointments" element={<Appointments/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
