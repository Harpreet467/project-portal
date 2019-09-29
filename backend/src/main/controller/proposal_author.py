from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.http.cros_headers import add_cors_headers
from src.main.model.proposal_author import ProposalAuthor as ProposalAuthorModel
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_admin, role_first_level, role_second_level


proposal_author_api = api_manager.create_api_blueprint(
    ProposalAuthorModel,
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

proposal_author_api.after_request(add_cors_headers)
app.register_blueprint(proposal_author_api)
