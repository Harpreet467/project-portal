from flask import render_template
from flask_mail import Message

from app import mail, celery, app
from src.resources.config import Config


@celery.task
def send_email(data):
    with app.app_context():
        mail.send(
            Message(
                data['subject'] + ' | ' + Config.APPLICATION_NAME,
                sender=Config.MAIL_DEFAULT_SENDER,
                recipients=[data['email_to']],
                html=render_template(
                    'email-template/mail.html',
                    APPLICATION_NAME=Config.APPLICATION_NAME,
                    BODY=data['body']
                )
            )
        )
