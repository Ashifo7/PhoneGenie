import { Phone } from '../../types/phone';

export const googlePhones: Phone[] = [
  {
    id: 'google-1',
    name: 'Google Pixel 8 Pro',
    company: 'Google',
    price: 89999,
    camera: 5,
    storage: 4,
    processor: 5,
    battery: 4,
    specs: {
      cameraMP: 50,
      storageGB: 256,
      processorGHz: 3.0,
      batteryMAh: 5050,
      ram: 12,
      display: {
        size: 6.7,
        resolution: '2992 x 1344',
        type: 'LTPO OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'google-2',
    name: 'Google Pixel 8',
    company: 'Google',
    price: 69999,
    camera: 5,
    storage: 4,
    processor: 5,
    battery: 4,
    specs: {
      cameraMP: 50,
      storageGB: 128,
      processorGHz: 3.0,
      batteryMAh: 4575,
      ram: 8,
      display: {
        size: 6.2,
        resolution: '2400 x 1080',
        type: 'OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'google-3',
    name: 'Google Pixel 7 Pro',
    company: 'Google',
    price: 69999,
    camera: 5,
    storage: 4,
    processor: 4,
    battery: 4,
    specs: {
      cameraMP: 50,
      storageGB: 256,
      processorGHz: 2.85,
      batteryMAh: 5000,
      ram: 12,
      display: {
        size: 6.7,
        resolution: '3120 x 1440',
        type: 'LTPO OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  }
];