import os
import time

from flask import send_from_directory
from werkzeug.utils import secure_filename

from app import app
from src.main.exception.exception import handle500, handle400


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config.get('ALLOWED_EXTENSIONS')


def upload_file(file):
    if file and allowed_file(file.filename):
        try:
            filename = secure_filename(time.strftime("%Y%m%d-%H%M%S-") + file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return filename
        except Exception as e:
            print(e)
            return handle500()
    else:
        return handle400()


def get_uploaded_file(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except Exception as e:
        print(e)
        return handle400()
