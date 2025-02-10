from ..models.recommendation_model import RecommendationModel
from ..models.viability_model import ViabilityModel

class ModelFactory:
    _recommendation_instance = None
    _viability_instance = None

    @classmethod
    def get_recommendation_model(cls):
        if not cls._recommendation_instance:
            cls._recommendation_instance = RecommendationModel()
        return cls._recommendation_instance

    @classmethod
    def get_viability_model(cls):
        if not cls._viability_instance:
            cls._viability_instance = ViabilityModel()
        return cls._viability_instance