from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from jinja2 import Environment, FileSystemLoader
from app.services.email_settings_service import get_all_email_settings
from sqlalchemy.orm import Session
import os

# Configure Jinja2 for email templates
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

# Function to get email configuration
def get_email_config(db: Session):
    config = get_all_email_settings(db)
    if not config:
        raise ValueError("No email configuration found.")
    
    smtp_config = config[0]
    
    return {
        "connection_config": ConnectionConfig(
            MAIL_USERNAME=smtp_config.FROM_MAIL,
            MAIL_PASSWORD=smtp_config.SMTP_PASSWORD,
            MAIL_FROM=smtp_config.FROM_MAIL,
            MAIL_PORT=smtp_config.SMTP_PORT,
            MAIL_SERVER=smtp_config.SMTP_HOST,
            MAIL_FROM_NAME="WebSite Builder", 
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True,
            MAIL_STARTTLS=True,  
            MAIL_SSL_TLS=False, 
        ),
        "to_mail": smtp_config.TO_MAIL 
    }

async def send_subscription_email(subscriber_email: str, db: Session):
    # Get the email configuration
    email_config = get_email_config(db)
    connection_config = email_config["connection_config"]
    recipient_email = email_config["to_mail"]  # Get TO_MAIL dynamically

    # Prepare the email content
    try:
        template = env.get_template("new_subscriber.html")
        html_content = template.render(USER_EMAIL=subscriber_email)
    except Exception as e:
        raise RuntimeError(f"Error rendering template: {e}")

    # Create the email message
    message = MessageSchema(
        subject="New Subscription Notification",
        recipients=[recipient_email],  # Use the recipient's email here
        body=html_content,
        subtype="html"
    )

    # Send the email
    fm = FastMail(connection_config)
    try:
        await fm.send_message(message)
        print(f"Subscription email sent to {subscriber_email}.")
    except Exception as e:
        raise RuntimeError(f"Failed to send email: {e}")



async def send_query_email(first_name:str,last_name:str,email:str,phone_number:str,query:str, db: Session):
    # Get the email configuration
    email_config = get_email_config(db)
    connection_config = email_config["connection_config"]
    recipient_email = email_config["to_mail"]  # Use the email from template_data

    # Prepare the email content
    template = env.get_template('query_template.html')
    html_content = template.render(FIRST_NAME=first_name,LAST_NAME=last_name,EMAIL=email,PHONE_NUMBER=phone_number,QUERY=query)

    # Create the email message
    message = MessageSchema(
        subject="Query Notification",
        recipients=[recipient_email],  # Send to the email from template_data
        body=html_content,
        subtype="html"
    )

    # Send the email
    fm = FastMail(connection_config)
    try:
        await fm.send_message(message)
        print(f"Query email sent to {recipient_email}.")
    except Exception as e:
        raise RuntimeError(f"Failed to send email: {e}")



async def send_reset_email(user_email: str, reset_link: str, db: Session):
    # Get the email configuration
    email_config = get_email_config(db)
    connection_config = email_config["connection_config"]
    
    # Prepare the email content
    try:
        template = env.get_template("reset_password.html")  # Use your reset email template
        html_content = template.render(RESET_LINK=reset_link)
    except Exception as e:
        raise RuntimeError(f"Error rendering template: {e}")

    # Create the email message
    message = MessageSchema(
        subject="Reset Your Password",
        recipients=[user_email],  # Send to the user's email
        body=html_content,
        subtype="html"
    )

    # Send the email
    fm = FastMail(connection_config)
    try:
        await fm.send_message(message)
        print(f"Reset password email sent to {user_email}.")
    except Exception as e:
        raise RuntimeError(f"Failed to send email: {e}")    
