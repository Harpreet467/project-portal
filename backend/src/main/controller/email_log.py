from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.email_log import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.email_log import EmailLog as EmailLogModel
from src.main.service.email_log import send_email as send_email_service
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_first_level, role_second_level

email_log_api = api_manager.create_api_blueprint(
    EmailLogModel,
    collection_name='email-log',
    methods=['GET', 'POST'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        GET_SINGLE=[auth_func, role_first_level],
        GET_MANY=[auth_func, role_first_level],
        POST=[auth_func, role_second_level]
    ),
    postprocessors=dict(
            POST=[send_email_service]
    )
)

email_log_api.after_request(add_cors_headers)
app.register_blueprint(email_log_api)
