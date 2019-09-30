from src.main.model import db


class ProjectCategory(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Boolean, default=True)
