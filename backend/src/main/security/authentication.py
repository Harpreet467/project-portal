from flask_praetorian import auth_required

from app import app, jwt
from src.main.model.staff import Staff


jwt.init_app(app, Staff)


def generate_jwt_token(email, password):
    return jwt.encode_jwt_token(
            jwt.authenticate(email, password)
        )


def get_jwt_token_refresh():
    return jwt.refresh_jwt_token(jwt.read_token_from_header())


def password_hash_preprocessor(data=None, **kwargs):
    if data and 'password' in data:
        data['password'] = jwt.hash_password(data['password'])


@auth_required
def auth_func(**kwargs):
    pass
