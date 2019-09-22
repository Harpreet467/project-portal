from flask_restless.views import ValidationError

from app import api_manager
from src.main.security.authentication import auth_func
from src.main.model.staff import Staff as StaffModel
from src.main.security.authorization import role_admin

api_manager.create_api(
    StaffModel,
    methods=['GET', 'POST', 'PUT', 'DELETE'],
    exclude_columns=['password'],
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        POST=[auth_func, role_admin],
        GET_SINGLE=[auth_func, role_admin],
        GET_MANY=[auth_func, role_admin],
        PUT_SINGLE=[auth_func, role_admin],
        PUT_MANY=[auth_func, role_admin],
        DELETE_SINGLE=[auth_func, role_admin],
        DELETE_MANY=[auth_func, role_admin]
    )
)
