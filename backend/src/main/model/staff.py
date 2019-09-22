from flask_security import UserMixin
from flask_security.utils import encrypt_password

from src.main.model import db
from src.main.model.entity import Entity
from src.main.model.roles_user import roles_users


class Staff(Entity, db.Model, UserMixin):
    email = db.Column(db.String(80), unique=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(60))
    active = db.Column(db.Boolean, default=True)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('staffs', lazy='dynamic'))

    last_login_at = db.Column(db.DateTime(), nullable=True)
    current_login_at = db.Column(db.DateTime(), nullable=True)
    last_login_ip = db.Column(db.String(255), nullable=True)
    current_login_ip = db.Column(db.String(255), nullable=True)
    login_count = db.Column(db.Integer, nullable=True)

    def get_security_payload(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'roles': list(row.name for row in self.roles)
        }

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.password = encrypt_password(kwargs['password'])
        self.email = kwargs['email']
        self.name = kwargs['name']

    def __repr__(self):
        return '<Staff[email=%s]>' % self.email
