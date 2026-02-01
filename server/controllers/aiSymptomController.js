
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
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); //gemini-3-flash-preview
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
//   console.error("GEMINI FULL ERROR 👉", error);

//   return res.status(error?.status || 500).json({
//     message: "AI error",
//     status: error?.status,
//     details: error?.errorDetails || error?.message || error
//   });
// }

// }



import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Example doctors list
const doctorsList = [
  { name: "Dr. Rajesh Kumar", specialization: "General Physician", available: true },
  { name: "Dr. Anjali Sharma", specialization: "Cardiologist", available: true },
  { name: "Dr. Vivek Reddy", specialization: "Neurologist", available: true },
  { name: "Dr. Priya Gupta", specialization: "Dermatologist", available: true },
  { name: "Dr. Arjun Singh", specialization: "General Physician", available: true },
  { name: "Dr. Kavita Nair", specialization: "Ayurveda", available: true },
  { name: "Dr. Sameer Verma", specialization: "Orthopedic", available: true },
  { name: "Dr. Nisha Patel", specialization: "Gastroenterologist", available: true },
  { name: "Dr. Karthik Iyer", specialization: "Pulmonologist", available: true },
  { name: "Dr. Meera Joshi", specialization: "Endocrinologist", available: true },
  { name: "Dr. Akash Sharma", specialization: "Ophthalmologist", available: true },
  { name: "Dr. Sunita Rao", specialization: "ENT", available: true },
  { name: "Dr. Deepak Malhotra", specialization: "Psychiatrist", available: true },
  { name: "Dr. Shreya Singh", specialization: "Pediatrician", available: true },
  { name: "Dr. Ramesh Iyer", specialization: "Nephrologist", available: true },
  { name: "Dr. Ananya Desai", specialization: "Rheumatologist", available: true },
  { name: "Dr. Pradeep Kumar", specialization: "Oncologist", available: true },
  { name: "Dr. Swati Gupta", specialization: "Gynecologist", available: true },
  { name: "Dr. Vishal Mehta", specialization: "Urologist", available: true },
  { name: "Dr. Pooja Reddy", specialization: "Allergist", available: true },
  { name: "Dr. Arvind Nair", specialization: "Ayurveda", available: true },
  { name: "Dr. Manisha Rao", specialization: "Homeopathy", available: true },
  { name: "Dr. Rohit Bhat", specialization: "Cardiologist", available: true },
  { name: "Dr. Nivedita Sen", specialization: "Dermatologist", available: true },
  { name: "Dr. Sameer Kapoor", specialization: "ENT", available: true },
  { name: "Dr. Sneha Rani", specialization: "Neurologist", available: true },
  { name: "Dr. Harshad Mehta", specialization: "Orthopedic", available: true },
  { name: "Dr. Isha Verma", specialization: "Pediatrician", available: true },
  { name: "Dr. Anil Joshi", specialization: "Psychiatrist", available: true },
  { name: "Dr. Priyanka Sharma", specialization: "Endocrinologist", available: true },
  { name: "Dr. Rajat Singh", specialization: "Nephrologist", available: true },
  { name: "Dr. Naina Kapoor", specialization: "Rheumatologist", available: true },
  { name: "Dr. Mohit Khanna", specialization: "Pulmonologist", available: true },
  { name: "Dr. Ritu Bansal", specialization: "Ophthalmologist", available: true },
  { name: "Dr. Varun Desai", specialization: "Oncologist", available: true },
  { name: "Dr. Meenal Agarwal", specialization: "Gynecologist", available: true },
  { name: "Dr. Kiran Rao", specialization: "Urologist", available: true },
  { name: "Dr. Aarav Nair", specialization: "Allergist", available: true },
  { name: "Dr. Seema Gupta", specialization: "Homeopathy", available: true },
  { name: "Dr. Tanvi Joshi", specialization: "Ayurveda", available: true },
  { name: "Dr. Vikram Patel", specialization: "General Physician", available: true },
];


// Mapping AI specialization text to your doctorsList
const specializationMap = {
  "general physician": "General Physician",
  "cardiology": "Cardiologist",
  "cardiologist": "Cardiologist",
  "neurology": "Neurologist",
  "neurologist": "Neurologist",
  "dermatology": "Dermatologist",
  "dermatologist": "Dermatologist",
  "ent": "ENT",
  "orthopedics": "Orthopedic",
  "orthopedic": "Orthopedic",
  "pediatrics": "Pediatrician",
  "pediatrician": "Pediatrician",
  "psychiatry": "Psychiatrist",
  "psychiatrist": "Psychiatrist",
  "endocrinology": "Endocrinologist",
  "endocrinologist": "Endocrinologist",
  "nephrology": "Nephrologist",
  "nephrologist": "Nephrologist",
  "rheumatology": "Rheumatologist",
  "rheumatologist": "Rheumatologist",
  "pulmonology": "Pulmonologist",
  "pulmonologist": "Pulmonologist",
  "ophthalmology": "Ophthalmologist",
  "ophthalmologist": "Ophthalmologist",
  "oncology": "Oncologist",
  "oncologist": "Oncologist",
  "gynecology": "Gynecologist",
  "gynecologist": "Gynecologist",
  "urology": "Urologist",
  "urologist": "Urologist",
  "allergist": "Allergist",
  "ayurveda": "Ayurveda",
  "homeopathy": "Homeopathy"
};


export const aiSymptomCheck = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({
        message: "Symptoms must be an array",
      });
    }

    const prompt = `
You are a healthcare assistant AI.

Symptoms: ${symptoms.join(", ")}

Rules:
- Do NOT diagnose
- Classify risk as Normal, Moderate, or Severe
- Suggest relevant doctor's specialization
- Suggest Ayurvedic/home remedies if risk is Normal or Moderate
- Provide a helpful message

Return ONLY valid JSON:
{
  "risk": "",
  "specialization": "",
  "ayurveda": [],
  "message": ""
}
`;

    // ✨ Correct text generation call
    const aiResult = await genAI.models.generateContent({
      model: "gemini-2.5-flash", // works correctly with @google/genai :contentReference[oaicite:1]{index=1}
      contents: prompt,
    });

    // Extract text result
    const textResponse = aiResult.text;

    // Clean up markdown ticks if present
    const cleaned = textResponse.replace(/```json|```/g, "").trim();

    let aiResponse;
    try {
      aiResponse = JSON.parse(cleaned);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        aiRaw: cleaned,
      });
    }

    // Filter doctors by specialization
    const doctors = doctorsList.filter(
      (d) =>
        d.specialization.toLowerCase() ===
        aiResponse.specialization.toLowerCase()
    );

    res.json({ ...aiResponse, doctors });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      message: "AI error",
      details: error.message,
    });
  }
};


