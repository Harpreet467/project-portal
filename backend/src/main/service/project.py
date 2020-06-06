from datetime import datetime

from flask import request, jsonify

from src.main.dto.project import project_file_upload as project_file_upload_dto
from src.main.exception.exception import handle400, handle404, handle405
from src.main.model import db
from src.main.model.project import Project
from src.main.model.project_category import ProjectCategory
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


def update_project(result):
    project = Project.query.filter_by(id=result['project']).first()
    project.status = result['project_status']
    project.updated_at = datetime.now()
    project.last_updated_by = result['staffs']['name']
    db.session.commit()
    return True


def get_project_count_for_categories():
    result_json = []
    results = db.session\
        .query(ProjectCategory.name, db.func.count(Project.id))\
        .join(Project.category)\
        .group_by(ProjectCategory.name)\
        .all()
    for result in results:
        result_json.append({
            'name': result[0],
            'y': result[1]
        })
    return jsonify(result_json)
