from flask import Flask
from flask_cors import CORS

from routes import register_routes
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    register_routes(app)
    
    return app

# ✅ Move `app = create_app()` outside so Gunicorn can find it
app = create_app()  # ✅ Now Gunicorn will see `app`

if __name__ == "__main__":
    app.run(debug=True)
