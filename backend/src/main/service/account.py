from flask import jsonify
from flask_security import logout_user, login_user

from src.main.exception.exception import handle401
from src.main.model import db_user_data_store, db
from src.main.security.authentication import generate_jwt_token, get_jwt_token_refresh
from src.resources.constant import ERROR_MESSAGE, SUCCESS_MESSAGE


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


def change_password(param):
    from flask_praetorian import current_user
    from app import jwt

    password = param.get('password', None)
    new_password = param.get('new_password', None)
    new_password_confirm = param.get('new_password_confirm', None)

    if new_password != new_password_confirm:
        return jsonify(dict(
            message=ERROR_MESSAGE['PASSWORD_NOT_MATCHED']
        )), 400

    user = db_user_data_store().find_user(email=current_user().email)
    if not user or not jwt._verify_password(password, user.password):
        return jsonify(dict(
            message=ERROR_MESSAGE['INVALID_PASSWORD']
        )), 400

    user.password = new_password
    db.session.commit()

    return jsonify(dict(
        message=SUCCESS_MESSAGE['PASSWORD_CHANGED']
    ))


def logout():
    from flask_login import current_user

    user = current_user
    user.authenticated = False
    logout_user()
