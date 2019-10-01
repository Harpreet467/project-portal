from src.main.model import db
from src.main.model.entity import Entity


class Project(Entity, db.Model):
    proposal_author = db.Column(db.Integer, db.ForeignKey('proposal_author.id'), nullable=False)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    file_name = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), default="PENDING")

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.title = kwargs['title']
        self.description = kwargs['description']
        self.proposal_author = kwargs['proposal_author']