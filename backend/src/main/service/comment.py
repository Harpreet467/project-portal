from datetime import datetime


def update_project_status(result=None, **kwargs):
    if result and 'project_status' in result and result['project_status'] is not None:
        from src.main.model.project import Project
        from src.main.model import db

        project = Project.query.filter_by(id=result['project']).first()
        project.status = result['project_status']
        project.updated_at = datetime.now()
        project.last_updated_by = result['staffs']['name']
        db.session.commit()
    return
