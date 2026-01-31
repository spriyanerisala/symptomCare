import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const checkSymptoms = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/symptoms/check",
      { symptoms: symptoms.toLowerCase().split(",") }
    );
    setResult(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Symptom Checker
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4 focus:outline-blue-500"
          placeholder="Enter symptoms (comma separated)"
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          onClick={checkSymptoms}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Check Symptoms
        </button>

        {result && (
          <div className="mt-6 p-5 rounded-lg bg-gray-50">
            <p className="font-semibold">
              Risk Level:
              <span className={`ml-2 ${
                result.risk === "High" ? "text-red-500" : "text-green-600"
              }`}>
                {result.risk}
              </span>
            </p>

            <p className="mt-2">{result.message}</p>

            {result.ayurveda.length > 0 && (
              <>
                <h4 className="font-semibold mt-4 text-green-600">
                  Ayurvedic Remedies
                </h4>
                <ul className="list-disc ml-6">
                  {result.ayurveda.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {result.consultDoctor && (
              <button
                onClick={() => navigate("/appointment")}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Book Doctor Appointment
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SymptomChecker;
