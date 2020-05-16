from datetime import datetime


def update_project_or_student_status(result=None, **kwargs):
    if result and 'project_status' in result and result['project_status'] is not None:
        if 'student' in result and result['student'] is not None:
            update_student(result)
        elif 'project' in result and result['project'] is not None:
            update_project(result)
    return


def update_project(result):
    from src.main.model.project import Project
    from src.main.model import db

    project = Project.query.filter_by(id=result['project']).first()
    project.status = result['project_status']
    project.updated_at = datetime.now()
    project.last_updated_by = result['staffs']['name']
    db.session.commit()
    return True


def update_student(result):
    from src.main.model.student import Student
    from src.main.model import db

    student = Student.query.filter_by(id=result['student']).first()
    student.status = result['project_status']
    student.updated_at = datetime.now()
    student.last_updated_by = result['staffs']['name']
    db.session.commit()
    return True
