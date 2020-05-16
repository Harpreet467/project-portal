from src.main.model import db
from src.main.model.entity import Entity


class Student(Entity, db.Model):
    name = db.Column(db.String(80))
    email = db.Column(db.String(255))
    phone_number = db.Column(db.String(15), nullable=True)
    description = db.Column(db.Text)
    city = db.Column(db.String(255))
    country = db.Column(db.String(255))
    is_in_team = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(15), default='INTERESTED')
    project = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    comments = db.relationship('Comment', backref='students', lazy=True)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.email = kwargs['email']
        self.name = kwargs['name']
        self.project = kwargs['project']
        self.phone_number = kwargs.get('phone_number', None)
        self.description = kwargs.get('description', None)
        self.city = kwargs.get('city', None)
        self.country = kwargs.get('country', None)
