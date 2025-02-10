from flask import Blueprint
from .recommendation_routes import recommendation_bp
from .viability_routes import viability_bp
from .feedback_routes import feedback_bp

def register_routes(app):
    """Register all blueprint routes"""
    app.register_blueprint(recommendation_bp, url_prefix='/api')
    app.register_blueprint(viability_bp, url_prefix='/api')
    app.register_blueprint(feedback_bp, url_prefix='/api')