import { Phone } from '../../types/phone';

export const applePhones: Phone[] = [
  {
    id: 'apple-1',
    name: 'iPhone 15 Pro Max',
    company: 'Apple',
    price: 159999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 4,
    specs: {
      cameraMP: 48,
      storageGB: 1024,
      processorGHz: 3.78,
      batteryMAh: 4441,
      ram: 8,
      display: {
        size: 6.7,
        resolution: '2796 x 1290',
        type: 'Super Retina XDR OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  {
    id: 'apple-2',
    name: 'iPhone 15 Pro',
    company: 'Apple',
    price: 134999,
    camera: 5,
    storage: 5,
    processor: 5,
    battery: 4,
    specs: {
      cameraMP: 48,
      storageGB: 512,
      processorGHz: 3.78,
      batteryMAh: 3274,
      ram: 8,
      display: {
        size: 6.1,
        resolution: '2556 x 1179',
        type: 'Super Retina XDR OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  // More iPhone models...
  {
    id: 'apple-3',
    name: 'iPhone 15 Plus',
    company: 'Apple',
    price: 89999,
    camera: 5,
    storage: 4,
    processor: 5,
    battery: 4,
    specs: {
      cameraMP: 48,
      storageGB: 256,
      processorGHz: 3.46,
      batteryMAh: 4383,
      ram: 6,
      display: {
        size: 6.7,
        resolution: '2796 x 1290',
        type: 'Super Retina XDR OLED',
      },
    },
    shopLinks: {
      amazon: 'https://www.amazon.com',
      flipkart: 'https://www.flipkart.com',
    },
  },
  // Continue with more iPhones...
];