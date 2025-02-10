from flask import Blueprint, request, jsonify
from ml import get_viability_model

viability_bp = Blueprint('viability', __name__)

@viability_bp.route('/viability', methods=['POST'])
def get_viability():
    data = request.get_json()
    phone = data.get('phone')
    
    if not phone:
        return jsonify({'error': 'Phone data is required'}), 400
    
    model = get_viability_model()
    viability_years = model.predict(phone)
    
    return jsonify({
        'viability_years': viability_years
    })

@viability_bp.route('/viability/feedback', methods=['POST'])
def update_viability():
    data = request.get_json()
    phone = data.get('phone')
    actual_viability = data.get('actual_viability')
    
    if not phone or actual_viability is None:
        return jsonify({'error': 'Phone and actual viability data are required'}), 400
    
    model = get_viability_model()
    model.update_model(phone, actual_viability)
    
    return jsonify({'status': 'success'})