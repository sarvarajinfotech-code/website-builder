from sqlalchemy import Column, Integer, String, Boolean
from app.utils.database import Base

class MeetingModel(Base):
    __tablename__ = "meeting"

    ID = Column(Integer, primary_key=True, index=True)
    SHOW_MEETING = Column(Boolean, nullable=False, default=False)
    BUTTON_TEXT = Column(String(255), nullable=False)
    MEETING_LINK = Column(String(500), nullable=False)
