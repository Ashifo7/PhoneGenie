from typing import Dict, Any
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from .base_model import BaseModel
from ..utils.feature_utils import normalize_viability_features

class ViabilityModel(BaseModel):
    """Model for predicting phone viability/longevity."""
    
    def __init__(self):
        """Initialize viability model."""
        super().__init__('viability')
    
    def _create_model(self) -> GradientBoostingRegressor:
        """Create and return a new GradientBoostingRegressor."""
        return GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
    
    def _normalize_features(self, phone: Dict[str, Any]) -> np.ndarray:
        """Normalize phone features for viability prediction.
        
        Args:
            phone: Phone specifications dictionary
        
        Returns:
            Normalized feature array
        """
        features = normalize_viability_features(phone)
        return self.scaler.transform(features.reshape(1, -1))
    
    def predict(self, phone: Dict[str, Any]) -> float:
        """Predict phone viability in years.
        
        Args:
            phone: Phone specifications dictionary
        
        Returns:
            Predicted viability in years (2-4 year range)
        """
        if not self.model:
            self.load_or_create_model()
        
        features = self._normalize_features(phone)
        prediction = float(self.model.predict(features)[0])
        return self._convert_to_years(prediction)
    
    def update_model(self, phone: Dict[str, Any], actual_viability: float) -> None:
        """Update model with actual viability data.
        
        Args:
            phone: Phone specifications dictionary
            actual_viability: Actual observed viability in years
        """
        if not self.model:
            self.load_or_create_model()
        
        features = self._normalize_features(phone)
        labels = np.array([actual_viability]).reshape(-1, 1)
        
        self.model.fit(features, labels)
        self._save_model()
    
    def _convert_to_years(self, prediction: float) -> float:
        """Convert model prediction to years in 2-4 year range.
        
        Args:
            prediction: Raw model prediction
        
        Returns:
            Converted prediction in years
        """
        years = 2 + (prediction * 2)
        return round(years, 1)