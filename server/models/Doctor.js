import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  available: Boolean
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;