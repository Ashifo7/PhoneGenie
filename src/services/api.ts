import { Phone, UserPreferences } from '../types/phone';
import { getRecommendations as getLocalRecommendations } from '../utils/recommendations';
import { calculateViabilityYears as getLocalViability } from '../utils/viabilityCalculator';

export const getPhoneRecommendations = async (
  phones: Phone[],
  preferences: UserPreferences
): Promise<Phone[]> => {
  return getLocalRecommendations(phones, preferences);
};

export const getPhoneViability = async (phone: Phone): Promise<number> => {
  return getLocalViability(phone);
};

export const updateModelFeedback = async (
  phone: Phone,
  preferences: UserPreferences,
  liked: boolean
): Promise<void> => {
  console.log('Feedback recorded (client-side only):', { phone, preferences, liked });
};

export const updateViabilityFeedback = async (
  phone: Phone,
  actualViability: number
): Promise<void> => {
  console.log('Viability feedback recorded (client-side only):', { phone, actualViability });
};