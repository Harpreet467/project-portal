from flask_praetorian import auth_required
from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.staff import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func
from src.main.model.staff import Staff as StaffModel
from src.main.security.authorization import role_admin
from src.main.service.staff import get_staff_count_for_roles as get_staff_count_for_roles_service


staff_api = api_manager.create_api_blueprint(
    StaffModel,
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        POST=[auth_func, role_admin],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func, role_admin],
        PUT_SINGLE=[auth_func],
        PUT_MANY=[auth_func, role_admin],
        PATCH_SINGLE=[auth_func],
        PATCH_MANY=[auth_func, role_admin]
    )
)

staff_api.after_request(add_cors_headers)
app.register_blueprint(staff_api)


@app.route('/api/staff/role/count', methods=['GET'])
@auth_required
def get_staff_count_for_roles():
    return get_staff_count_for_roles_service()
