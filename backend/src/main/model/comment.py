from src.main.model import db
from src.main.model.entity import Entity


class Comment(Entity, db.Model):
    project = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=True)
    text = db.Column(db.Text)
    project_status = db.Column(db.String(50), nullable=True)
    sent_email = db.Column(db.BOOLEAN, default=False)
    status = db.Column(db.Boolean, default=True)
    commented_by = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.text = kwargs['text']
        self.project = kwargs.get('project', None)
        self.student = kwargs.get('student', None)
        self.project_status = kwargs.get('project_status', None)
        self.sent_email = kwargs.get('sent_email', False)
        self.commented_by = kwargs['commented_by']
