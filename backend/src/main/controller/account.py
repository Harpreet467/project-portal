from flask_jwt import jwt_required

from app import app
from src.main.service.account import account_details as account_details_service
from src.main.service.account import logout as logout_service
from src.main.dto.account import logout as logout_dto


@app.route('/account-details', methods=['GET'])
@jwt_required()
def account_details():
    return account_details_service()


@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    logout_service()
    return logout_dto()
