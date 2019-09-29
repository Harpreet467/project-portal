from flask import request

from src.main.dto.project import project_file_upload as project_file_upload_dto
from src.main.exception.exception import handle400, handle404, handle405
from src.main.model import db
from src.main.model.project import Project
from src.main.util.file_upload import upload_file


def project_file_upload(project_id):
    if request.method == 'PATCH':
        if 'file' not in request.files:
            return handle400()

        file = request.files['file']
        if file.filename == '':
            return handle400()

        filename = upload_file(file)
        project = Project.query.filter_by(id=project_id).first()
        if project:
            project.file_name = filename
            db.session.commit()
            return project_file_upload_dto()

        else:
            return handle404()
    else:
        return handle405()
