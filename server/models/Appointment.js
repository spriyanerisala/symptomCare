import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: [String], required: true },
  doctorName: { type: String, required: true },
  timing: { type: Date, required: true },
  emergency: { type: Boolean, default: false },
  status: { type: String, default: "Booked" } // can be Booked, Completed, Cancelled
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
