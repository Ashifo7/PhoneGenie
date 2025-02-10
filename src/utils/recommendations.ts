import { Phone, UserPreferences } from '../types/phone';
import { logError } from './errorHandler';

// Client-side scoring function
const scorePhone = (phone: Phone, preferences: UserPreferences): number => {
  const scores = {
    camera: (phone.specs.cameraMP / 200) * preferences.camera,
    storage: (phone.specs.storageGB / 1024) * preferences.storage,
    processor: (phone.specs.processorGHz / 4) * preferences.processor,
    battery: (phone.specs.batteryMAh / 6000) * preferences.battery
  };

  return Object.values(scores).reduce((sum, score) => sum + score, 0);
};

export const getRecommendations = async (
  phones: Phone[],
  preferences: UserPreferences
): Promise<Phone[]> => {
  // Filter phones by price range
  const priceFilteredPhones = phones.filter(
    phone => phone.price >= preferences.minPrice && phone.price <= preferences.maxPrice
  );

  // Score and sort phones
  const scoredPhones = priceFilteredPhones.map(phone => ({
    phone,
    score: scorePhone(phone, preferences)
  }));

  scoredPhones.sort((a, b) => b.score - a.score);
  
  return scoredPhones.map(({ phone }) => phone);
};