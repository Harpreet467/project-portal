from flask_restless import ProcessingException
from flask_security import logout_user

from src.main.model import db_user_data_store
from src.main.security.authentication import generate_jwt_token, get_jwt_token_refresh
from src.resources.constant import CONSTANT
from src.resources.status_code import STATUS_CODE


def auth(param):
    return dict(
        access_token=generate_jwt_token(
            param.get('email', None),
            param.get('password', None)
        )
    )


def account_details():
    from flask_praetorian import current_user

    email = current_user().email
    user = db_user_data_store().find_user(email=email)
    if user and email == user.email:
        return user.get_security_payload()
    return ProcessingException(description=CONSTANT.NOT_AUTHORIZED, code=STATUS_CODE.ER_401)


def refresh_token():
    return dict(
        access_token=get_jwt_token_refresh()
    )


def logout():
    from flask_login import current_user

    user = current_user
    user.authenticated = False
    logout_user()
