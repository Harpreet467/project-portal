from datetime import timedelta


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
    JWT_AUTH_HEADER_PREFIX = 'Bearer'
    JWT_SECRET_KEY = 'secret'
    JWT_AUTH_USERNAME_KEY = 'email'
    JWT_EXPIRATION_DELTA = timedelta(minutes=10)
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
