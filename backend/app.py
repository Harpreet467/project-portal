from flask import Flask

from src.main.model.entity import Base, engine
from src.main.http.background_jobs import make_celery
from src.resources.config import REDIS_URL, UPLOAD_FOLDER, MAX_CONTENT_LENGTH

# generate database schema
Base.metadata.create_all(engine)

app = Flask(__name__)

# Redis config with app
app.config.update(
    CELERY_BROKER_URL=REDIS_URL,
    CELERY_RESULT_BACKEND=REDIS_URL
)
celery = make_celery(app)

# Upload Media
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
