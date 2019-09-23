from flask_jwt import JWT, jwt_required
from flask_security.utils import verify_password, login_user

from app import app
from src.main.model import db_user_data_store


def authenticate(username, password):
    user = db_user_data_store().find_user(email=username)
    if user and username == user.email and verify_password(password, user.password):
        login_user(user)
        return user


def identity(payload):
    user = db_user_data_store().find_user(id=payload['identity'])
    return user


jwt = JWT(app, authenticate, identity)


@jwt_required()
def auth_func(**kwargs):
    pass
