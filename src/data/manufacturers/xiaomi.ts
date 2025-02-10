import { Phone } from '../../types/phone';

export const xiaomiPhones: Phone[] = [
  {
    id: 'xiaomi-1',
    name: 'Xiaomi 14 Pro',
    company: 'Xiaomi',
    price: 69999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 5,
    specs: {
      cameraMP: 50,
      storageGB: 512,
      processorGHz: 3.3,
      batteryMAh: 4880,
      ram: 12,
      display: {
        size: 6.73,
        resolution: '3200 x 1440',
        type: 'LTPO AMOLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  // More Xiaomi models...
];