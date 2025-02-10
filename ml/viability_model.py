import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

class ViabilityModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = 'ml/models/viability_model.joblib'
        self.scaler_path = 'ml/models/viability_scaler.joblib'

    def _create_model(self):
        return GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )

    def _normalize_features(self, phone):
        features = np.array([
            phone['specs']['processorGHz'] / 4,  # Max processor speed
            phone['specs']['ram'] / 16,  # Max RAM
            phone['specs']['storageGB'] / 1024,  # Max storage
            phone['price'] / 200000,  # Max price
            phone['specs']['batteryMAh'] / 6000  # Max battery
        ]).reshape(1, -1)
        
        return self.scaler.transform(features)

    def load_or_create_model(self):
        try:
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            print('Loaded existing model')
        except:
            print('Creating new model')
            self.model = self._create_model()
            self._save_model()
        return self.model

    def _save_model(self):
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)

    def predict(self, phone):
        if not self.model:
            self.load_or_create_model()

        features = self._normalize_features(phone)
        prediction = self.model.predict(features)[0]
        
        # Convert to years (2-4 years range) and round to 1 decimal
        years = 2 + (prediction * 2)
        return round(years, 1)

    def update_model(self, phone, actual_viability):
        if not self.model:
            self.load_or_create_model()

        features = self._normalize_features(phone)
        labels = np.array([actual_viability]).reshape(-1, 1)

        # Partial fit for online learning
        self.model.fit(features, labels)
        self._save_model()