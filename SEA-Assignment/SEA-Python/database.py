
from datetime import date, timedelta
import random
from unittest.mock import Base
from sqlalchemy import Column, Date, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Team(Base):
    __tablename__ = "team"
    
    team_id = Column(Integer, primary_key=True, index=True)
    team_name = Column (String)

class User(Base):
    __tablename__ = "user"
    
    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column (String)
    email = Column (String)
    team_id = Column(Integer)
    role = Column (String)

class Match(Base):
    __tablename__ = "match"
    
    match_id = Column(Integer, primary_key=True, index=True)
    location = Column (String)
    date = Column(Date)
    opponent_team_id = Column(Integer)
    home_team_id = Column(Integer)

class UserMatch(Base):
    __tablename__ = "user_match"
    
    user_id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer)
    
engine = create_engine("sqlite:///:memory:")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

for i in range(1,11):
    new_team = Team(team_id=i, team_name="Team " + str(i))
    session.add(new_team)

for team in session.query(Team).all():
    print(team.team_id, team.team_name)

for i in range(1, 11):
    user_roles = ["Player", "Coach", "Manager"]
    names = [
    "Alice Johnson",
    "Benjamin Carter",
    "Clara Rodriguez",
    "David Thompson",
    "Ella Nguyen",
    "Franklin White",
    "Grace Patel",
    "Henry Kim",
    "Isla Martinez",
    "Jack Robinson"
]
    new_user = User(
            user_id=i,
            full_name=names[i-1],
            email=f"user{i}@example.com",
            team_id=random.randint(1, 10),
            role=random.choice(user_roles)
        )
    session.add(new_user)

for user in session.query(User).all():
    print(user.user_id, user.full_name, user.email, user.team_id, user.role)

for i in range(1, 11):
    locations = ["London", "Paris", "Liverpool", "Cornwal", "Miami"]
    match = Match(
            match_id=i,
            location=random.choice(locations),
            date=date.today() + timedelta(days=i),
            opponent_team_id=random.randint(1, 10),
            home_team_id=random.randint(1, 10)
        )
    session.add(match)

for match in session.query(Match).all():
    print(match.match_id, match.location, match.date, match.opponent_team_id, match.home_team_id)

for i in range(10):
    new_user_match = UserMatch(
            user_id=random.randint(1, 10),
            match_id=random.randint(1, 10)
        )
    session.add(new_user_match)


session.commit()

for um in session.query(UserMatch).all():
    print(um.user_id, um.match_id)

    


    