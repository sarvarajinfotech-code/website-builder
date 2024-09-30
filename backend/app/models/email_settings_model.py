from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class EmailSettingsModel(Base):
    __tablename__ = "email_settings"

    ID = Column(Integer, primary_key=True, index=True)
    FROM_MAIL = Column(String(255), nullable=False)
    TO_MAIL = Column(String(255), nullable=False)
    SMTP_HOST = Column(String(255), nullable=False)
    SMTP_PORT = Column(Integer, nullable=False)
    SMTP_USERNAME = Column(String(255), nullable=False)
    SMTP_PASSWORD = Column(String(255), nullable=False)
