from sqlalchemy import Column, Integer, String, Boolean
from app.utils.database import Base

class MeetingModel(Base):
    __tablename__ = "meeting"

    ID = Column(Integer, primary_key=True, index=True)
    SHOW_CALENDLY = Column(Boolean, nullable=False, default=False)
    CALENDLY_LINK = Column(String(500), nullable=True)
    SHOW_WHATSAPP = Column(Boolean, nullable=False, default=False)
    WHATSAPP_NUMBER = Column(String(50), nullable=True)
    SHOW_TAWKTO = Column(Boolean, nullable=False, default=False)
    TAWKTO_PROPERTY_ID = Column(String(100), nullable=True)
    BUTTON_TEXT = Column(String(255), nullable=True)  # Optional, for Calendly
