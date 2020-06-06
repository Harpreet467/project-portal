from datetime import datetime

from src.main.service.email import send_email as send_email_service
from src.main.model.email_log import EmailLog
from src.main.model.project import Project
from src.main.model.proposal_author import ProposalAuthor
from src.main.model.student import Student
from src.main.model import db


def add_email_log(result):
    email_log = EmailLog()
    email_log.subject = result['project_status']
    email_log.body = result['text']
    email_log.project = result['project']
    email_log.sent_by = result['staffs']['id']
    email_log.last_updated_by = result['staffs']['name']
    email_log.created_at = datetime.now()
    email_log.updated_at = datetime.now()

    if 'student' in result and result['student']:
        email_log.student = result['student']

        student = Student.query.filter_by(id=result['student']).first()
        email_log.email_to = student.email

    elif 'project' in result and result['project']:
        project = Project.query.filter_by(id=result['project']).first()
        email_log.proposal_author = project.proposal_author

        proposal_author = ProposalAuthor.query.filter_by(id=project.proposal_author).first()
        email_log.email_to = proposal_author.email

    send_email_service.apply_async(args=[email_log.__dict__])
    db.session.add(email_log)
    db.session.commit()
    return True


def send_email(result):
    send_email_service.apply_async(args=[result])
