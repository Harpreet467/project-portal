from datetime import datetime

from src.main.model.student import Student
from src.main.model import db


def update_student(result):
    student = Student.query.filter_by(id=result['student']).first()
    student.status = result['project_status']
    student.updated_at = datetime.now()
    student.last_updated_by = result['staffs']['name']
    db.session.commit()
    return True
