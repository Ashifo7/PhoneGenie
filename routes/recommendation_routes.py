from flask import Blueprint, request, jsonify
from ml import get_recommendation_model

recommendation_bp = Blueprint('recommendations', __name__)

@recommendation_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    phones = data.get('phones', [])
    preferences = data.get('preferences', {})
    
    model = get_recommendation_model()
    recommendations = model.predict(phones, preferences)
    
    return jsonify({
        'recommendations': [phone['id'] for phone in recommendations]
    })