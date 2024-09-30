from sqlalchemy.orm import Session
from app.models.email_settings_model import EmailSettingsModel

# Create new email settings
def create_email_settings(db: Session, from_mail: str, to_mail: str, smtp_host: str, 
                          smtp_port: int, smtp_username: str, smtp_password: str):
    new_email_settings = EmailSettingsModel(
        FROM_MAIL=from_mail,
        TO_MAIL=to_mail,
        SMTP_HOST=smtp_host,
        SMTP_PORT=smtp_port,
        SMTP_USERNAME=smtp_username,
        SMTP_PASSWORD=smtp_password
    )
    db.add(new_email_settings)
    db.commit()
    db.refresh(new_email_settings)
    return new_email_settings

# Get email settings by ID
def get_email_settings(db: Session, email_settings_id: int):
    return db.query(EmailSettingsModel).filter(EmailSettingsModel.ID == email_settings_id).first()

# Get all email settings entries
def get_all_email_settings(db: Session):
    return db.query(EmailSettingsModel).all()

# Update email settings by ID
def update_email_settings(db: Session, email_settings_id: int, from_mail: str, to_mail: str, 
                          smtp_host: str, smtp_port: int, smtp_username: str, smtp_password: str):
    email_settings = db.query(EmailSettingsModel).filter(EmailSettingsModel.ID == email_settings_id).first()
    if email_settings:
        email_settings.FROM_MAIL = from_mail
        email_settings.TO_MAIL = to_mail
        email_settings.SMTP_HOST = smtp_host
        email_settings.SMTP_PORT = smtp_port
        email_settings.SMTP_USERNAME = smtp_username
        email_settings.SMTP_PASSWORD = smtp_password
        db.commit()
        db.refresh(email_settings)
        return email_settings
    return None

# Delete email settings by ID
def delete_email_settings(db: Session, email_settings_id: int):
    email_settings = db.query(EmailSettingsModel).filter(EmailSettingsModel.ID == email_settings_id).first()
    if email_settings:
        db.delete(email_settings)
        db.commit()
        return email_settings
    return None
