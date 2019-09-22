from flask_restless import ProcessingException

from app import security


@security.unauthorized_handler
def un_authorize(**kwargs):
    print('here')
    raise ProcessingException(description='Not Authorized', code=401)
