from flask_restless import ProcessingException

from src.resources.constant import STATUS_MESSAGE, STATUS_CODE


def handle400():
    return ProcessingException(description=STATUS_MESSAGE.BAD_REQUEST, code=STATUS_CODE.ER_400)


def handle401():
    return ProcessingException(description=STATUS_MESSAGE.NOT_AUTHORIZED, code=STATUS_CODE.ER_401)


def handle404():
    return ProcessingException(description=STATUS_MESSAGE.NOT_FOUND, code=STATUS_CODE.ER_404)


def handle405():
    return ProcessingException(description=STATUS_MESSAGE.METHOD_NOT_ALLOWED, code=STATUS_CODE.ER_405)


def handle500():
    return ProcessingException(description=STATUS_MESSAGE.INTERNAL_SERVER_ERROR, code=STATUS_CODE.ER_500)
