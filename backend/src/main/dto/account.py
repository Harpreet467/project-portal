from flask import jsonify
from flask_jwt import jwt_required, current_identity
from flask_jwt_extended import get_jwt_identity
from flask_login import current_user
from flask_security import logout_user

from app import app
from src.main.controller.account import account_details as account_details_controller


@app.route('/account-details', methods=['GET'])
@jwt_required()
def account_details():
    print(get_jwt_identity())
    return account_details_controller(
        current_user.email
    )


@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    user = current_user
    user.authenticated = False
    logout_user()
    return jsonify({
        'message': 'logged out'
    })
