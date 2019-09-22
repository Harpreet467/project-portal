from src.main.model import db

roles_users = db.Table(
    'roles_users',
    db.Column('staff_id', db.Integer(), db.ForeignKey('staff.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)
