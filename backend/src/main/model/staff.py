from flask_security import UserMixin

from app import jwt
from src.main.model import db
from src.main.model.entity import Entity
from src.main.model.roles_user import roles_users
from src.main.dto.staff import get_security_payload as get_security_payload_dto


class Staff(Entity, db.Model, UserMixin):
    email = db.Column(db.String(255), unique=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(60))
    active = db.Column(db.Boolean, default=True)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('staffs', lazy='dynamic'))

    last_login_at = db.Column(db.DateTime(), nullable=True)
    current_login_at = db.Column(db.DateTime(), nullable=True)
    last_login_ip = db.Column(db.String(255), nullable=True)
    current_login_ip = db.Column(db.String(255), nullable=True)
    login_count = db.Column(db.Integer, nullable=True, default=0)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.email = kwargs['email']
        self.name = kwargs['name']
        self.password = jwt.hash_password(kwargs['password'])

    def get_security_payload(self):
        return get_security_payload_dto(self)

    @property
    def rolenames(self):
        return list(row.name for row in self.roles)

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(email=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.active

    def __repr__(self):
        return '<Staff[email=%s]>' % self.email
