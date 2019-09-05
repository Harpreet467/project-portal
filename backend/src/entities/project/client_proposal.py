from marshmallow import Schema, fields
from sqlalchemy import Column, String

from src.entities.entity import Entity, Base


class ClientProposal(Entity, Base):
    __tablename__ = 'project_client_proposal'

    title = Column(String)
    description = Column(String)
    file_name = Column(String)

    def __init__(self, title, description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description


class ClientProposalSchema(Schema):
    id = fields.Number()
    title = fields.Str()
    description = fields.Str()
    file_name = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
