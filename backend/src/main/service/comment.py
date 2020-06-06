from src.main.service.email_log import add_email_log
from src.main.service.project import update_project
from src.main.service.student import update_student


def update_project_or_student_status(result=None, **kwargs):
    if result and 'project_status' in result and result['project_status'] is not None:
        if 'student' in result and result['student'] is not None:
            update_student(result)
        elif 'project' in result and result['project'] is not None:
            update_project(result)
        if 'sent_email' in result and result['sent_email'] is True:
            add_email_log(result)
    return
