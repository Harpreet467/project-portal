from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.project_category import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func
from src.main.model.project_category import ProjectCategory


project_category_api = api_manager.create_api_blueprint(
    ProjectCategory,
    collection_name='project-category',
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    validation_exceptions=[ValidationError],
    exclude_columns=exclude_columns(),
    preprocessors=dict(
        POST=[auth_func],
        PUT_SINGLE=[auth_func],
        PUT_MANY=[auth_func],
        PATCH_SINGLE=[auth_func],
        PATCH_MANY=[auth_func]
    )
)

project_category_api.after_request(add_cors_headers)
app.register_blueprint(project_category_api)
