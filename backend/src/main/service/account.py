from flask_security import logout_user, login_user

from src.main.exception.exception import handle401
from src.main.model import db_user_data_store
from src.main.security.authentication import generate_jwt_token, get_jwt_token_refresh


def auth(param):
    email = param.get('email', None)
    password = param.get('password', None)

    token = dict(access_token=generate_jwt_token(email, password))

    user = db_user_data_store().find_user(email=email)
    if user and email == user.email:
        login_user(user)
        db_user_data_store().commit()

    return token


def account_details():
    from flask_praetorian import current_user

    email = current_user().email
    user = db_user_data_store().find_user(email=email)
    if user and email == user.email:
        return user.get_security_payload()
    return handle401()


def refresh_token():
    return dict(
        access_token=get_jwt_token_refresh()
    )


def change_password():
    from flask_security.views import change_password
    return change_password()


def logout():
    from flask_login import current_user

    user = current_user
    user.authenticated = False
    logout_user()
