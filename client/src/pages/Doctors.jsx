
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors/get");
        setDoctors(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
 

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Available Doctors
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading doctors...</p>
        )}

        {!loading && doctors.length === 0 && (
          <p className="text-center text-gray-500">No doctors found</p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {doctor.name}
              </h3>

              <p className="text-gray-600 mt-1">
                Specialization:{" "}
                <span className="font-medium">{doctor.specialization}</span>
              </p>

              <div className="mt-4 flex items-center justify-start gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    doctor.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </span>

                {doctor.available && (
                  <button onClick={()=>{
                     navigate('/appointment',{state:{doctor}})
                  }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
