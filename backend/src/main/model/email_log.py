from src.main.model import db
from src.main.model.entity import Entity


class EmailLog(Entity, db.Model):
    body = db.Column(db.Text)
    subject = db.Column(db.String(255))
    email_to = db.Column(db.String(255))
    status = db.Column(db.Boolean, default=True)
    project = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    sent_by = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=True)
    proposal_author = db.Column(db.Integer, db.ForeignKey('proposal_author.id'), nullable=True)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.subject = kwargs.get('subject', None)
        self.body = kwargs.get('body', None)
        self.email_to = kwargs.get('email_to', None)
        self.sent_by = kwargs.get('sent_by', None)
        self.student = kwargs.get('student', None)
        self.proposal_author = kwargs.get('proposal_author', None)
        self.project = kwargs.get('project', None)
