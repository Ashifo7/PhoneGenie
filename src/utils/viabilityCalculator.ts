import { Phone } from '../types/phone';
import { logError } from './errorHandler';

// Client-side viability calculation
const calculateViabilityScore = (phone: Phone): number => {
  const processorScore = phone.specs.processorGHz / 4;
  const ramScore = phone.specs.ram / 16;
  const storageScore = phone.specs.storageGB / 1024;
  const batteryScore = phone.specs.batteryMAh / 6000;

  // Calculate weighted average
  const score = (
    processorScore * 0.3 +
    ramScore * 0.25 +
    storageScore * 0.25 +
    batteryScore * 0.2
  );

  // Convert score to years (2-4 year range)
  return 2 + (score * 2);
};

export const calculateViabilityYears = async (phone: Phone): Promise<number> => {
  try {
    const years = calculateViabilityScore(phone);
    // Ensure result is within 2-4 year range
    return Math.max(2, Math.min(4, Number(years.toFixed(1))));
  } catch (error) {
    logError('Viability Calculation', error);
    return 2.5; // Default fallback
  }
};

// Stub for model updates since we're running client-side
export const updateViabilityModel = async (phone: Phone, actualViability: number): Promise<void> => {
  console.log('Viability feedback recorded (client-side only):', { phone, actualViability });
};