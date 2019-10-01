from src.main.model import db

project_to_category = db.Table(
    'project_to_category',
    db.Column('project_id', db.Integer(), db.ForeignKey('project.id')),
    db.Column('category_id', db.Integer(), db.ForeignKey('project_category.id'))
)
