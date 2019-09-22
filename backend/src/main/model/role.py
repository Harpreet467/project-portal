from flask_security import RoleMixin

from src.main.model import db


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))
    status = db.Column(db.Boolean, default=True)
