import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    APPLICATION_NAME = 'Capstone Project Portal'
    TEMPLATE_FOLDER = BASE_DIR + '/template/'
    DEBUG = True
    SECRET_KEY = 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # DB Configuration
    DB_HOST = 'localhost'
    DB_PORT = '3306'
    DB_NAME = 'project-portal'
    DB_USER = 'root'
    DB_PASSWORD = 'root'
    SQLALCHEMY_DATABASE_URI = f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

    # Redis Configuration
    REDIS_URL = 'redis://localhost:6379/0'
    CELERY_BROKER_URL = REDIS_URL
    CELERY_RESULT_BACKEND = REDIS_URL

    # File upload
    UPLOAD_FOLDER = BASE_DIR + '/../../storage/uploads'
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100MB
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'zip', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'tar'}

    # CORS
    CORS_HEADERS = 'application/json'

    # Security
    PRAETORIAN_HASH_SCHEME = 'bcrypt'
    JWT_ACCESS_LIFESPAN = {'minutes': 15}
    JWT_REFRESH_LIFESPAN = {'days': 1}
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'X-AUTH-TOKEN'
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_SALT = 'HMAC'
    SECURITY_TRACKABLE = True
    WTF_CSRF_ENABLED = False

    # Email config
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_DEFAULT_SENDER = 'Capstone Project Portal'
    MAIL_USERNAME = ''
    MAIL_PASSWORD = ''
