from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.role import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func
from src.main.model.role import Role


role_api = api_manager.create_api_blueprint(
    Role,
    methods=['GET', 'POST', 'PUT', 'DELETE'],
    validation_exceptions=[ValidationError],
    exclude_columns=exclude_columns(),
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

role_api.after_request(add_cors_headers)
app.register_blueprint(role_api)
