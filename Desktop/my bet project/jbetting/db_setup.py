from app import app
from models import db, Team

with app.app_context():
    db.create_all()
    # Add sample teams
    team1 = Team(name='Team A', strength=3)
    team2 = Team(name='Team B', strength=2)
    team3 = Team(name='Team C', strength=4)
    db.session.add_all([team1, team2, team3])
    db.session.commit()
