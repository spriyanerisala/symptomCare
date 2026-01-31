import Doctor from "../models/Doctor.js";

/* Add new doctor */
export const addDoctor = async (req, res) => {
  try {
    const { name, specialization,available } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      available
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding doctor"
    });
  }
};

/* Get all doctors */
export const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

/* Get available doctor by specialization */
export const getAvailableDoctor = async (req, res) => {
  const { specialization } = req.params;

  const doctor = await Doctor.findOne({
    specialization,
    available: true
  });

  if (!doctor) {
    return res.json({
      success: false,
      message: "No doctor available"
    });
  }

  res.json({
    success: true,
    doctor
  });
};
