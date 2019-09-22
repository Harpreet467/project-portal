from flask_restless.views import ValidationError

from app import api_manager
from src.main.security.authentication import auth_func
from src.main.model.role import Role

api_manager.create_api(
    Role,
    methods=['GET', 'POST', 'PUT', 'DELETE'],
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        POST=[auth_func],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func],
        PUT_SINGLE=[auth_func],
        PUT_MANY=[auth_func],
        DELETE_SINGLE=[auth_func],
        DELETE_MANY=[auth_func]
    )
)
