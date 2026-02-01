

import { useState } from "react";
import axios from "axios";

const AISymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(""); // status message for appointment
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkSymptoms = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/symptoms/check-ai-symptoms`,
        { symptoms: symptoms.split(",").map(s => s.trim()) }
      );
      setResult(res.data);
      setBookingStatus(""); // reset booking message
    } catch (err) {
      console.error(err);
      setBookingStatus("Failed to analyze symptoms");
    }
  };

  const bookAppointment = async (doctor) => {
    try {
      // Example payload: you can extend to include user info
      const payload = {
        doctorName: doctor.name,
        specialization: doctor.specialization,
        symptoms: symptoms.split(",").map(s => s.trim()),
      };

      const res = await axios.post(`${backendUrl}/appointments`, payload);
      setBookingStatus(`Appointment booked successfully with ${doctor.name}`);
    } catch (err) {
      console.error(err);
      setBookingStatus("Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">AI Symptom Checker</h2>

      <textarea
        rows="4"
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Enter your symptoms separated by commas"
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button
        onClick={checkSymptoms}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Analyze Symptoms
      </button>

      {bookingStatus && (
        <p className="mt-4 text-green-600 font-semibold">{bookingStatus}</p>
      )}

      {result && (
        <div className="mt-6">
          <p
            className={`font-bold text-lg ${
              result.risk === "Severe"
                ? "text-red-600"
                : result.risk === "Moderate"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            Risk Level: {result.risk}
          </p>

          <p className="mt-2">{result.message}</p>

          {result.ayurveda?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-green-700">Ayurvedic Suggestions:</h4>
              <ul className="list-disc ml-6">
                {result.ayurveda.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {result.doctors?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-red-600">Available Doctors:</h4>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                {result.doctors.map((doc, i) => (
                  <div key={i} className="border p-4 rounded-lg shadow">
                    <p className="font-semibold">{doc.name}</p>
                    <p>{doc.specialization}</p>
                    <button
                      onClick={() => bookAppointment(doc)}
                      className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISymptomChecker;

