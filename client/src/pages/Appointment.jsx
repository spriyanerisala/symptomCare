/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Appointment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;

  const [patientName, setPatientName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [timing, setTiming] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [message, setMessage] = useState("");

  if (!doctor) {
    return (
      <>
     
        <p className="text-center mt-10">No doctor selected. Go back to <button className="text-blue-500 underline" onClick={()=>navigate("/doctors")}>Doctors</button></p>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/appointments/book", {
        patientName,
        symptoms: symptoms.split(",").map(s => s.trim()),
        doctorName: doctor.name,
        timing,
        emergency
      });
      
    
      setMessage("Appointment booked successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Error booking appointment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Book Appointment
        </h2>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600">Specialization: <span className="font-medium">{doctor.specialization}</span></p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Symptoms (comma separated)</label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Preferred Timing</label>
              <input
                type="datetime-local"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emergency}
                onChange={(e) => setEmergency(e.target.checked)}
              />
              <label className="text-gray-700">Emergency</label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Book Appointment
            </button>

            <button className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition" onClick={()=>{navigate('/doctors')}}>Go Back</button>
          </form>

          {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Appointment;
