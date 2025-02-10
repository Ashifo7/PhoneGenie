from .utils.model_factory import ModelFactory

# Expose main functionality through clean interface
get_recommendation_model = ModelFactory.get_recommendation_model
get_viability_model = ModelFactory.get_viability_model