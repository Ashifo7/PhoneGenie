import { Phone } from '../types/phone';
import { applePhones } from './manufacturers/apple';
import { samsungPhones } from './manufacturers/samsung';
import { xiaomiPhones } from './manufacturers/xiaomi';
import { oneplusPhones } from './manufacturers/oneplus';
import { googlePhones } from './manufacturers/google';

// Combine all phone data
export const phones: Phone[] = [
  ...applePhones,
  ...samsungPhones,
  ...xiaomiPhones,
  ...oneplusPhones,
  ...googlePhones,
];

// Export individual manufacturer collections for filtered views
export {
  applePhones,
  samsungPhones,
  xiaomiPhones,
  oneplusPhones,
  googlePhones,
};