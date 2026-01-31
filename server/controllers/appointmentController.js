import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const { patientName, symptoms, doctorName, timing, emergency } = req.body;

    // Validate
    if (!patientName || !symptoms || !doctorName || !timing) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      patientName,
      symptoms,
      doctorName,
      timing,
      emergency
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
