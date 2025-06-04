// src/utils/aiSummary.ts
// Utility to create an AI-generated summary for a vehicle

export async function getAISummary(vehicleData: object): Promise<string> {
  // This is a placeholder for AI summary logic.
  // In a real implementation, you would call an AI API here (e.g., OpenAI, Azure OpenAI, etc.)
  // For now, we return a static summary for demonstration.
  return `Zusammenfassung für ${vehicleData?.overview?.header || 'Fahrzeug'}: 

` +
    `- Modell: ${vehicleData?.overview?.subHeader || 'Unbekannt'}\n` +
    `- Erstzulassung: ${vehicleData?.technicalData?.initialRegistrationDate || 'Unbekannt'}\n` +
    `- Kilometerstand: ${vehicleData?.technicalData?.mileage?.toLocaleString() || 'Unbekannt'} km\n` +
    `- Preis: ${vehicleData?.overview?.price?.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' }) || 'Unbekannt'}\n`;
}
