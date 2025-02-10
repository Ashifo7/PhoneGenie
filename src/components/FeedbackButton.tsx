import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Phone } from '../types/phone';
import { updateModelFeedback } from '../services/api';
import { usePreferences } from '../store/PreferencesContext';
import { logError } from '../utils/errorHandler';

interface FeedbackButtonProps {
  phone: Phone;
  onFeedbackGiven?: () => void;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({ phone, onFeedbackGiven }) => {
  const { preferences } = usePreferences();
  const [hasGivenFeedback, setHasGivenFeedback] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFeedback = async (liked: boolean) => {
    try {
      await updateModelFeedback(phone, preferences, liked);
      setHasGivenFeedback(true);
      setError(null);
      if (onFeedbackGiven) {
        onFeedbackGiven();
      }
    } catch (err) {
      logError('Feedback Submission', err);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  if (hasGivenFeedback) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleFeedback(true)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          Like
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          Dislike
        </button>
      </div>
      {error && (
        <div className="text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};