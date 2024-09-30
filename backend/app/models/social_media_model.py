from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class SocialMediaModel(Base):
    __tablename__ = "social_media"

    ID = Column(Integer, primary_key=True, index=True)
    MEDIA_NAME = Column(String(255), nullable=False)
    SVG_ICON = Column(Text, nullable=False)
    LINK = Column(String(255), nullable=False)
