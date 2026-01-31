export const checkSymptoms = (req, res) => {
  const { symptoms } = req.body;

  let result = {
    risk: "Low",
    message: "",
    ayurveda: [],
    consultDoctor: false
  };

  if (
    symptoms.includes("chest pain") ||
    symptoms.includes("breathlessness")
  ) {
    result.risk = "High";
    result.message =
      "Based on symptoms, professional medical consultation is advised.";
    result.consultDoctor = true;
  } 
  else if (
    symptoms.includes("cold") ||
    symptoms.includes("cough")
  ) {
    result.message = "Mild condition detected.";
    result.ayurveda = [
      "Drink turmeric milk",
      "Ginger tea",
      "Steam inhalation"
    ];
  } 
  else {
    result.message = "Maintain healthy lifestyle.";
  }

  res.json(result);
};
