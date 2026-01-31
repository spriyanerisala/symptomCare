import { diseaseMap } from "./diseaseMap.js";
import { ayurvedaMap } from "./ayurvedaMap.js";
import { evaluateRisk } from "./riskEvaluator.js";

export const analyzeSymptoms = (symptoms) => {
  const matchedDiseases = diseaseMap.filter(disease =>
    disease.symptoms.some(symptom =>
      symptoms.some(userSymptom =>
        userSymptom.toLowerCase().includes(symptom)
      )
    )
  );

  const risk = evaluateRisk(matchedDiseases);

  const primaryDisease = matchedDiseases[0]?.disease || "General Condition";

  return {
    risk,
    disease: primaryDisease,
    specialization:
      risk === "Severe"
        ? "Emergency Medicine"
        : risk === "Moderate"
        ? "General Physician"
        : "Ayurveda",
    ayurveda:
      risk !== "Severe"
        ? ayurvedaMap[primaryDisease] || []
        : [],
    message:
      risk === "Severe"
        ? "Symptoms indicate a serious condition. Please consult a doctor immediately."
        : "Follow the suggested remedies and monitor your condition."
  };
};
