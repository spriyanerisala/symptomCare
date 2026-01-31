import { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/appointments/get-appointments`
        );

        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [backendUrl]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Loading appointments...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 font-medium">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          No appointments found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <p>
                <strong>Patient:</strong> {appt.patientName}
              </p>
              <p>
                <strong>Doctor:</strong> {appt.doctorName}
              </p>
              <p>
                <strong>Symptoms:</strong>{" "}
                {appt.symptoms.join(", ")}
              </p>
              <p>
                <strong>Timing:</strong>{" "}
                {new Date(appt.timing).toLocaleString()}
              </p>
              <p>
                <strong>Emergency:</strong>{" "}
                {appt.emergency ? "Yes 🚨" : "No"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
