from abc import ABC, abstractmethod
import os
import joblib
from sklearn.preprocessing import StandardScaler
from typing import Any

class BaseModel(ABC):
    """Abstract base class for all ML models."""
    
    def __init__(self, model_name: str):
        """Initialize base model with name and paths.
        
        Args:
            model_name: Name of the model for saving/loading
        """
        self.model = None
        self.scaler = StandardScaler()
        self._setup_paths(model_name)
    
    def _setup_paths(self, model_name: str) -> None:
        """Set up model and scaler file paths."""
        base_dir = 'ml/models/saved'
        os.makedirs(base_dir, exist_ok=True)
        self.model_path = f'{base_dir}/{model_name}_model.joblib'
        self.scaler_path = f'{base_dir}/{model_name}_scaler.joblib'
    
    @abstractmethod
    def _create_model(self) -> Any:
        """Create and return a new model instance."""
        pass
    
    @abstractmethod
    def _normalize_features(self, *args, **kwargs) -> Any:
        """Normalize input features for the model."""
        pass
    
    def load_or_create_model(self) -> Any:
        """Load existing model or create new one if not found."""
        try:
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            print(f'Loaded existing model from {self.model_path}')
        except (FileNotFoundError, EOFError):
            print('Creating new model')
            self.model = self._create_model()
            self._save_model()
        return self.model
    
    def _save_model(self) -> None:
        """Save model and scaler to disk."""
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
        print(f'Saved model to {self.model_path}')