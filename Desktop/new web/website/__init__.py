# filename: __init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path

# Initialize SQLAlchemy instance
db = SQLAlchemy()

# Define the name of the database file
DB_NAME = "database.db"

# Function to create Flask app
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    # Initialize SQLAlchemy with the app
    db.init_app(app)

    # Import blueprints and register them
    from .views import views
    from .auth import auth
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Import models to ensure they are included in database creation
    from .models import User, Note

    # Create all database tables if they do not exist
    with app.app_context():
        db.create_all()

    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # Define a function to load a user
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app
