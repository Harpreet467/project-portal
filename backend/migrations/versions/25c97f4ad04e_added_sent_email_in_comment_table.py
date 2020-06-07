"""Added sent_email in comment table

Revision ID: 25c97f4ad04e
Revises: 8640811f2121
Create Date: 2020-05-30 12:24:24.408865

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25c97f4ad04e'
down_revision = '8640811f2121'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comment', sa.Column('sent_email', sa.BOOLEAN(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comment', 'sent_email')
    # ### end Alembic commands ###