from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.staff import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func, password_hash
from src.main.model.staff import Staff as StaffModel
from src.main.security.authorization import role_admin

staff_api = api_manager.create_api_blueprint(
    StaffModel,
    methods=['GET', 'POST', 'PUT', 'DELETE'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        POST=[auth_func, role_admin],
        GET_SINGLE=[auth_func, role_admin],
        GET_MANY=[auth_func, role_admin],
        PUT_SINGLE=[auth_func, role_admin, password_hash],
        PUT_MANY=[auth_func, role_admin, password_hash],
        DELETE_SINGLE=[auth_func, role_admin],
        DELETE_MANY=[auth_func, role_admin]
    )
)

staff_api.after_request(add_cors_headers)
app.register_blueprint(staff_api)
