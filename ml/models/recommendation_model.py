from typing import List, Tuple, Dict, Any
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from .base_model import BaseModel
from ..utils.feature_utils import normalize_phone_features

class RecommendationModel(BaseModel):
    """Model for phone recommendations based on user preferences."""
    
    def __init__(self):
        """Initialize recommendation model."""
        super().__init__('recommendation')
    
    def _create_model(self) -> RandomForestRegressor:
        """Create and return a new RandomForestRegressor."""
        return RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1  # Use all available cores
        )
    
    def _normalize_features(self, phone: Dict[str, Any], preferences: Dict[str, Any]) -> np.ndarray:
        """Normalize phone and preference features.
        
        Args:
            phone: Phone specifications dictionary
            preferences: User preferences dictionary
        
        Returns:
            Normalized feature array
        """
        features = normalize_phone_features(phone, preferences)
        return self.scaler.transform(features.reshape(1, -1))
    
    def predict(self, phones: List[Dict[str, Any]], preferences: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Predict best phones based on preferences.
        
        Args:
            phones: List of phone dictionaries
            preferences: User preferences dictionary
        
        Returns:
            Sorted list of phones by prediction score
        """
        if not self.model:
            self.load_or_create_model()
        
        predictions: List[Tuple[Dict[str, Any], float]] = []
        for phone in phones:
            features = self._normalize_features(phone, preferences)
            score = float(self.model.predict(features)[0])
            predictions.append((phone, score))
        
        predictions.sort(key=lambda x: x[1], reverse=True)
        return [phone for phone, _ in predictions]
    
    def update_model(self, phone: Dict[str, Any], preferences: Dict[str, Any], liked: bool) -> None:
        """Update model with user feedback.
        
        Args:
            phone: Phone specifications dictionary
            preferences: User preferences dictionary
            liked: Whether user liked the recommendation
        """
        if not self.model:
            self.load_or_create_model()
        
        features = self._normalize_features(phone, preferences)
        labels = np.array([1.0 if liked else 0.0]).reshape(-1, 1)
        
        self.model.fit(features, labels)
        self._save_model()