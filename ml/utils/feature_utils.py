import numpy as np

def normalize_phone_features(phone, preferences):
    """Extract and normalize features for phone recommendation"""
    return np.array([
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
    ])

def normalize_viability_features(phone):
    """Extract and normalize features for viability prediction"""
    return np.array([
        phone['specs']['processorGHz'] / 4,  # Max processor speed
        phone['specs']['ram'] / 16,  # Max RAM
        phone['specs']['storageGB'] / 1024,  # Max storage
        phone['price'] / 200000,  # Max price
        phone['specs']['batteryMAh'] / 6000  # Max battery
    ])