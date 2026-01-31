// pages/AppointmentSuccess.jsx
import { useNavigate } from "react-router-dom";

const AppointmentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Appointment Booked Successfully!</h2>
      <p className="mb-6">Thank you! Your appointment has been confirmed.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default AppointmentSuccess;
