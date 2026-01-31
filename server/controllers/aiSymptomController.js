
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import Doctor from  '../models/Doctor.js';
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("gemini key : ",process.env.GEMINI_API_KEY)
// // Example doctors list
// const doctorsList = [
//   { name: "Dr. Rajesh Kumar", specialization: "General Physician", available: true },
//   { name: "Dr. Anjali Sharma", specialization: "Cardiologist", available: true },
//   { name: "Dr. Vivek Reddy", specialization: "Neurologist", available: true },
//   { name: "Dr. Priya Gupta", specialization: "Dermatologist", available: true },
//   { name: "Dr. Arjun Singh", specialization: "General Physician", available: true },
//   { name: "Dr. Kavita Nair", specialization: "Ayurveda", available: true },
//    { name: "Dr. Sameer Verma", specialization: "Orthopedic", available: true },
//   { name: "Dr. Nisha Patel", specialization: "Gastroenterologist", available: true },
//   { name: "Dr. Karthik Iyer", specialization: "Pulmonologist", available: true },
//   { name: "Dr. Meera Joshi", specialization: "Endocrinologist", available: true },
//   { name: "Dr. Akash Sharma", specialization: "Ophthalmologist", available: true },
//   { name: "Dr. Sunita Rao", specialization: "ENT", available: true },
//   { name: "Dr. Deepak Malhotra", specialization: "Psychiatrist", available: true },
//   { name: "Dr. Shreya Singh", specialization: "Pediatrician", available: true },
//   { name: "Dr. Ramesh Iyer", specialization: "Nephrologist", available: true },
//   { name: "Dr. Ananya Desai", specialization: "Rheumatologist", available: true },
//   { name: "Dr. Pradeep Kumar", specialization: "Oncologist", available: true },
//   { name: "Dr. Swati Gupta", specialization: "Gynecologist", available: true },
//   { name: "Dr. Vishal Mehta", specialization: "Urologist", available: true },
//   { name: "Dr. Pooja Reddy", specialization: "Allergist", available: true },
//   { name: "Dr. Arvind Nair", specialization: "Ayurveda", available: true },
//   { name: "Dr. Manisha Rao", specialization: "Homeopathy", available: true }
//   // Add more doctors as needed
// ];

// export const aiSymptomCheck = async (req, res) => {
//   const { symptoms } = req.body;

//   if (!symptoms || symptoms.length === 0) {
//     return res.status(400).json({ message: "Please provide symptoms" });
//   }

//   const prompt = `
// You are a healthcare assistant AI. 
// The user entered the following symptoms: ${symptoms.join(", ")}.

// - Classify the condition as one of: Normal, Moderate, Severe
// - Suggest the relevant doctor's specialization
// - Provide Ayurvedic/home remedies if condition is Normal or Moderate
// - Provide a short advice message
// - Do NOT give a diagnosis, only guidance

// Return strictly in JSON format like this:
// {
//   "risk": "",
//   "specialization": "",
//   "ayurveda": [],
//   "message": ""
// }
// `;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     // Remove ```json backticks if present
//     text = text.replace(/```json/g, "").replace(/```/g, "").trim();

//     let aiResponse;
//     try {
//       aiResponse = JSON.parse(text);
//     } catch (parseError) {
//       return res.status(500).json({
//         message: "Error parsing AI response. Ensure AI returns JSON.",
//         aiRaw: text,
//       });
//     }
  
//    // const allDoctors = await Doctor.find({available:true})
//     // Filter doctors based on AI suggestion
//     const suggestedDoctors = doctorsList.filter(
//       (d) =>
//         d.specialization.toLowerCase() === aiResponse.specialization.toLowerCase() &&
//         d.available
//     );

//     // Send final response
//     res.json({
//       ...aiResponse,
//       doctors: suggestedDoctors,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "AI error", error });
//   }
// };


import Doctor from "../models/Doctor.js";
import { analyzeSymptoms } from "../utils/symptomEngine.js";

export const aiSymptomCheck = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ message: "Please provide symptoms" });
    }

    const analysis = analyzeSymptoms(symptoms);

    const doctors = await Doctor.find({
      specialization: analysis.specialization,
      available: true
    });

    res.json({
      ...analysis,
      doctors
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
