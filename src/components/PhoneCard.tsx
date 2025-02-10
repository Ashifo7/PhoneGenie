import React, { useState } from 'react';
import { Phone } from '../types/phone';
import { Camera, HardDrive, Cpu, Battery, ShoppingCart, BarChart2, Smartphone } from 'lucide-react';
import { PhoneViability } from './PhoneViability';
import { PriceHistoryGraph } from './PriceHistoryGraph';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../store/ComparisonContext';
import { getGradientColors } from '../utils/gradients';
import { FeedbackButton } from './FeedbackButton';

interface PhoneCardProps {
  phone: Phone;
  isSelected?: boolean;
  isMainCard?: boolean;
  hideCompare?: boolean;
  showFeedback?: boolean;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  phone,
  isSelected,
  isMainCard = false,
  hideCompare = false,
  showFeedback = false,
}) => {
  const navigate = useNavigate();
  const { setComparisonPhone } = useComparison();
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  const handleCompare = () => {
    setComparisonPhone(phone);
    navigate('/compare');
  };

  const { from, to } = getGradientColors(phone.id);

  return (
    <div
      className={`rounded-xl transition-all ${
        isSelected
          ? 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 dark:border-purple-400 shadow-lg'
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl border border-gray-100 dark:border-gray-700'
      } ${isMainCard ? 'p-6' : 'p-4'}`}
    >
      <div className={`flex flex-col ${isMainCard ? 'gap-4' : 'gap-3'}`}>
        <div className="relative group h-48 rounded-lg overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${from} ${to} flex items-center justify-center transform transition-transform group-hover:scale-110`}>
            <Smartphone className="w-16 h-16 text-white/90" />
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-medium">{phone.name}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className={`${isMainCard ? 'text-xl' : 'text-lg'} font-semibold text-gray-900 dark:text-gray-100`}>
                {phone.name}
              </h3>
              <p className={`${isMainCard ? 'text-lg' : 'text-base'} font-medium text-purple-600 dark:text-purple-400`}>
                ₹{phone.price.toLocaleString()}
              </p>
            </div>
            {!hideCompare && !isMainCard && (
              <button
                onClick={handleCompare}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600 text-white rounded-lg flex items-center gap-1.5 text-sm hover:from-purple-600 hover:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                Compare
              </button>
            )}
          </div>

          <PhoneViability phone={phone} />

          <div className={`grid grid-cols-2 gap-2 mt-4`}>
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <Camera className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.specs.cameraMP}MP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <HardDrive className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.specs.storageGB}GB</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <Cpu className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.specs.processorGHz}GHz</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <Battery className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.specs.batteryMAh}mAh</span>
            </div>
          </div>

          {showFeedback && (
            <div className="mt-4">
              <FeedbackButton phone={phone} />
            </div>
          )}

          <PriceHistoryGraph
            phoneId={phone.id}
            isExpanded={showPriceHistory}
            onToggle={() => setShowPriceHistory(!showPriceHistory)}
          />

          <div className="mt-4 flex gap-2">
            <a
              href={phone.shopLinks.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 text-white py-2 px-3 rounded-lg text-sm hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 transition-all transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Amazon</span>
            </a>
            <a
              href={phone.shopLinks.flipkart}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-2 px-3 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Flipkart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};