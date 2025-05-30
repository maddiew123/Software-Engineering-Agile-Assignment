from datetime import date, timedelta
import random
from unittest.mock import Base
from fastapi import Depends, FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import jwt
from pydantic import BaseModel
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
    username = Column(String)
    password_hash = Column (String)
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

# class UserMatch(Base):
#     __tablename__ = "user_match"

#     user_id = Column(Integer, primary_key=True, index=True)
#     match_id = Column(Integer)

engine = create_engine("sqlite:///database.db")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

for i in range(1,11):
    new_team = Team(team_id=i, team_name="Team " + str(i))
    session.add(new_team)

# for team in session.query(Team).all():
#     print(team.team_id, team.team_name)

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
usernames = [
    "alice_johnson",
    "ben_carter23",
    "clara.rod",
    "david_t",
    "ella.nguyen",
    "frank_white91",
    "grace_patel7",
    "henrykim",
    "isla.m",
    "jackr_88"
]

for i in range(1, 11):
    new_user = User(
        user_id=i,
        username= usernames[i-1],
        password_hash="testtest",
        full_name=names[i-1],
        email=f"user{i}@example.com",
        team_id=random.randint(1, 10),
        role=random.choice(user_roles)
    )
    session.add(new_user)

# for user in session.query(User).all():
#     print(user.user_id, user.password_hash, user.full_name, user.email, user.team_id, user.role)

for i in range(1, 11):
    locations = ["London", "Paris", "Liverpool", "Cornwal", "Miami"]
    match = Match(
            match_id=i,
            location=random.choice(locations),
            date=date.today() + timedelta(days=i),
            opponent_team_id=random.randint(1, 10),
            home_team_id=2
        )
    session.add(match)

# for match in session.query(Match).all():
#     print(match.match_id, match.location, match.date, match.opponent_team_id, match.home_team_id)

# for i in range(10):
#     new_user_match = UserMatch(
#             user_id=random.randint(1, 10),
#             match_id=random.randint(1, 10)
#         )
#     session.add(new_user_match)


# session.commit()

# for um in session.query(UserMatch).all():
#     print(um.user_id, um.match_id)

SECRET_KEY = "SECRET_TEE_HEE"
ALGORITHM = "HS256"
ACCES_TOKEN_EXPRIES_MINUTES = 800

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class LoginItem(BaseModel):
    username: str
    password_hash: str

@app.get("/")
def read_root():
    return session.query(User).all()

@app.post("/login")
async def user_login(loginitem:LoginItem):

    data = jsonable_encoder(loginitem)
    user_input = session.query(User).filter_by(username=data['username']).first()
    if data['username']== user_input.username and data['password_hash']== user_input.password_hash:
        payload = jsonable_encoder(user_input)
        encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}
    else:
        return {"message": "login_failed"}
    
@app.get("/team/{team_id}")
def get_team_name(team_id: int):
    team = session.query(Team).filter(Team.team_id == team_id).first()
    if team:
        return {"team_name": team.team_name}
    else:
        return {"team_name": "Unknown Team"}
    
@app.get("/match/{team_id}")
def get_user_match(team_id: int):
    match = session.query(Match).filter(Match.home_team_id == team_id).all()
    if match:
        return {"user_match": match}
    else:
        return {"team_name": "Unknown Team"}

