import { Phone } from '../../types/phone';

export const oneplusPhones: Phone[] = [
  {
    id: 'oneplus-1',
    name: 'OnePlus 12',
    company: 'OnePlus',
    price: 64999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 5,
    specs: {
      cameraMP: 50,
      storageGB: 512,
      processorGHz: 3.3,
      batteryMAh: 5400,
      ram: 16,
      display: {
        size: 6.82,
        resolution: '3168 x 1440',
        type: 'LTPO AMOLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'oneplus-2',
    name: 'OnePlus 12R',
    company: 'OnePlus',
    price: 39999,
    camera: 4,
    storage: 4,
    processor: 5,
    battery: 5,
    specs: {
      cameraMP: 50,
      storageGB: 256,
      processorGHz: 3.2,
      batteryMAh: 5500,
      ram: 16,
      display: {
        size: 6.78,
        resolution: '2780 x 1264',
        type: 'LTPO AMOLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'oneplus-3',
    name: 'OnePlus Nord CE 3',
    company: 'OnePlus',
    price: 24999,
    camera: 4,
    storage: 4,
    processor: 4,
    battery: 4,
    specs: {
      cameraMP: 50,
      storageGB: 128,
      processorGHz: 2.8,
      batteryMAh: 5000,
      ram: 8,
      display: {
        size: 6.7,
        resolution: '2412 x 1080',
        type: 'AMOLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  }
];