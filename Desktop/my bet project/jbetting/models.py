from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Team {self.name}>'

# Create teams for each country
def create_teams():
    teams = [
        # Spain
        {"name": "Real Madrid", "country": "Spain"},
        {"name": "FC Barcelona", "country": "Spain"},
        {"name": "Atletico Madrid", "country": "Spain"},
        {"name": "Sevilla FC", "country": "Spain"},
        {"name": "Valencia CF", "country": "Spain"},
        
        # England
        {"name": "Manchester United", "country": "England"},
        {"name": "Liverpool FC", "country": "England"},
        {"name": "Chelsea FC", "country": "England"},
        {"name": "Manchester City", "country": "England"},
        {"name": "Arsenal FC", "country": "England"},
        
        # Italy
        {"name": "Juventus FC", "country": "Italy"},
        {"name": "AC Milan", "country": "Italy"},
        {"name": "Inter Milan", "country": "Italy"},
        {"name": "AS Roma", "country": "Italy"},
        {"name": "SSC Napoli", "country": "Italy"},
        
        # France
        {"name": "Paris Saint-Germain", "country": "France"},
        {"name": "Olympique Lyonnais", "country": "France"},
        {"name": "Olympique de Marseille", "country": "France"},
        {"name": "AS Monaco", "country": "France"},
        {"name": "LOSC Lille", "country": "France"},
        
        # Germany
        {"name": "Bayern Munich", "country": "Germany"},
        {"name": "Borussia Dortmund", "country": "Germany"},
        {"name": "RB Leipzig", "country": "Germany"},
        {"name": "Bayer Leverkusen", "country": "Germany"},
        {"name": "Schalke 04", "country": "Germany"}
    ]

    for team in teams:
        db.session.add(Team(name=team["name"], country=team["country"]))
    db.session.commit()
