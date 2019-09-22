from flask_restless import ProcessingException

from src.main.model import db_user_data_store


def account_details(email):
    user = db_user_data_store().find_user(email=email)
    if user and email == user.email:
        return user.get_security_payload()
    return ProcessingException(description='Not Authorized', code=401)
