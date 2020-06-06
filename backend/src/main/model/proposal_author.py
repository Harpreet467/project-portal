from src.main.model import db
from src.main.model.entity import Entity


class ProposalAuthor(Entity, db.Model):
    name = db.Column(db.String(80))
    email = db.Column(db.String(255))
    phone_number = db.Column(db.String(15), nullable=True)
    organisation_name = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Boolean, default=True)
    projects = db.relationship('Project', backref='proposal_authors', lazy=True)
    email_logs = db.relationship('EmailLog', backref='proposal_authors', lazy=True)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.email = kwargs['email']
        self.name = kwargs['name']
        self.phone_number = kwargs.get('phone_number', None)
        self.organisation_name = kwargs.get('organisation_name', None)
