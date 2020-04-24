from datetime import datetime

from src.main.model import db


class Entity(object):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    last_updated_by = db.Column(db.String(255))

    def __init__(self, last_updated_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = last_updated_by

    def __setattr__(self, key, value):
        if key == 'updated_at':
            value = datetime.now()
        super().__setattr__(key, value)
