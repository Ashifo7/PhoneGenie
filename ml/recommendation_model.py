import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

class RecommendationModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = 'ml/models/recommendation_model.joblib'
        self.scaler_path = 'ml/models/recommendation_scaler.joblib'

    def _create_model(self):
        return RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )

    def _normalize_features(self, phone, preferences):
        features = np.array([
            phone['specs']['cameraMP'] / 200,  # Max camera MP
            phone['specs']['storageGB'] / 1024,  # Max storage
            phone['specs']['processorGHz'] / 4,  # Max processor speed
            phone['specs']['batteryMAh'] / 6000,  # Max battery
            phone['specs']['ram'] / 16,  # Max RAM
            phone['price'] / 200000,  # Max price
            preferences['camera'] / 5,
            preferences['storage'] / 5,
            preferences['processor'] / 5,
            preferences['battery'] / 5,
            (preferences['maxPrice'] - preferences['minPrice']) / 200000
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

    def predict(self, phones, preferences):
        if not self.model:
            self.load_or_create_model()

        predictions = []
        for phone in phones:
            features = self._normalize_features(phone, preferences)
            score = self.model.predict(features)[0]
            predictions.append((phone, score))

        # Sort by prediction score in descending order
        predictions.sort(key=lambda x: x[1], reverse=True)
        return [phone for phone, _ in predictions]

    def update_model(self, phone, preferences, liked):
        if not self.model:
            self.load_or_create_model()

        features = self._normalize_features(phone, preferences)
        labels = np.array([1.0 if liked else 0.0]).reshape(-1, 1)

        # Partial fit for online learning
        self.model.fit(features, labels)
        self._save_model()