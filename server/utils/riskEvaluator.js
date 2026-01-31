export const evaluateRisk = (matchedDiseases) => {
  if (matchedDiseases.some(d => d.severity === "Severe")) return "Severe";
  if (matchedDiseases.some(d => d.severity === "Moderate")) return "Moderate";
  return "Normal";
};
