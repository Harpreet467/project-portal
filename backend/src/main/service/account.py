from flask_jwt import current_identity
from flask_login import current_user
from flask_restless import ProcessingException
from flask_security import logout_user

from src.main.model import db_user_data_store
from src.resources.constant import CONSTANT
from src.resources.status_code import STATUS_CODE


def account_details():
    email = current_identity.email
    user = db_user_data_store().find_user(email=email)
    if user and email == user.email:
        return user.get_security_payload()
    return ProcessingException(description=CONSTANT.NOT_AUTHORIZED, code=STATUS_CODE.ER_401)


def logout():
    user = current_user
    user.authenticated = False
    logout_user()
