from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.http.cros_headers import add_cors_headers
from src.main.model.project import Project as ProjectModel
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_admin, role_first_level, role_second_level
from src.main.service.project import project_file_upload as project_file_upload_service
from src.main.util.file_upload import get_uploaded_file as get_uploaded_file_service


project_api = api_manager.create_api_blueprint(
    ProjectModel,
    methods=['GET', 'POST', 'PUT', 'DELETE'],
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        GET_SINGLE=[auth_func, role_first_level],
        GET_MANY=[auth_func, role_first_level],
        PUT_SINGLE=[auth_func, role_second_level],
        PUT_MANY=[auth_func, role_second_level],
        DELETE_SINGLE=[auth_func, role_admin],
        DELETE_MANY=[auth_func, role_admin]
    )
)

project_api.after_request(add_cors_headers)
app.register_blueprint(project_api)


@app.route('/api/project/upload/<int:project_id>', methods=['PATCH'])
def project_file_upload(project_id):
    return project_file_upload_service(project_id)


@app.route('/api/project/download/<path:filename>', methods=['GET'])
def get_uploaded_file(filename):
    return get_uploaded_file_service(filename)
