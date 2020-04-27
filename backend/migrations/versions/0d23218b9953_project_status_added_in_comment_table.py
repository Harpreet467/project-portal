"""Project_status added in Comment table

Revision ID: 0d23218b9953
Revises: 
Create Date: 2020-04-26 16:04:26.631828

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d23218b9953'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comment', sa.Column('project_status', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comment', 'project_status')
    # ### end Alembic commands ###