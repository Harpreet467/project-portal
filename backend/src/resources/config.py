import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = True
    SECRET_KEY = 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # DB Configuration
    DB_HOST = 'localhost'
    DB_PORT = '3306'
    DB_NAME = 'project-portal'
    DB_USER = 'root'
    DB_PASSWORD = 'root'

    # Redis Configuration
    REDIS_URL = 'redis://localhost:6379'

    # File upload
    UPLOAD_FOLDER = '/path/to/the/uploads'
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100MB

    # CORS
    CORS_HEADERS = 'application/json'

    # Security
    PRAETORIAN_HASH_SCHEME = 'bcrypt'
    JWT_ACCESS_LIFESPAN = {'minutes': 60}
    JWT_REFRESH_LIFESPAN = {'days': 1}
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'X-AUTH-TOKEN'
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_SALT = 'HMAC'
    SECURITY_TRACKABLE = True
    WTF_CSRF_ENABLED = False

    # Email config
    MAIL_SERVER = ''
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = ''
    MAIL_PASSWORD = ''

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return f'mysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'

    @property
    def CELERY_BROKER_URL(self):
        return self.REDIS_URL

    @property
    def CELERY_RESULT_BACKEND(self):
        return self.REDIS_URL
