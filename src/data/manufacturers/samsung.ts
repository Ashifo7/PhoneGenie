import { Phone } from '../../types/phone';

export const samsungPhones: Phone[] = [
  {
    id: 'samsung-1',
    name: 'Samsung Galaxy S24 Ultra',
    company: 'Samsung',
    price: 129999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 5,
    specs: {
      cameraMP: 200,
      storageGB: 1024,
      processorGHz: 3.39,
      batteryMAh: 5000,
      ram: 12,
      display: {
        size: 6.8,
        resolution: '3088 x 1440',
        type: 'Dynamic AMOLED 2X',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'samsung-2',
    name: 'Samsung Galaxy S24+',
    company: 'Samsung',
    price: 99999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 5,
    specs: {
      cameraMP: 50,
      storageGB: 512,
      processorGHz: 3.39,
      batteryMAh: 4900,
      ram: 12,
      display: {
        size: 6.7,
        resolution: '3120 x 1440',
        type: 'Dynamic AMOLED 2X',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  // More Samsung models...
];