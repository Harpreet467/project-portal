from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.comment import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.comment import Comment as CommentModel
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_first_level, role_second_level
from src.main.service.comment import update_project_status

comment_api = api_manager.create_api_blueprint(
    CommentModel,
    methods=['GET', 'POST'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        GET_SINGLE=[auth_func, role_first_level],
        GET_MANY=[auth_func, role_first_level],
        POST=[auth_func, role_second_level]
    ),
    postprocessors=dict(
        POST=[update_project_status]
    )
)

comment_api.after_request(add_cors_headers)
app.register_blueprint(comment_api)
