from flask import Blueprint, request, jsonify
from ml import get_recommendation_model

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    phone = data.get('phone')
    preferences = data.get('preferences')
    liked = data.get('liked')
    
    if not all([phone, preferences, liked is not None]):
        return jsonify({'error': 'Phone, preferences, and liked status are required'}), 400
    
    model = get_recommendation_model()
    model.update_model(phone, preferences, liked)
    
    return jsonify({'status': 'success'})