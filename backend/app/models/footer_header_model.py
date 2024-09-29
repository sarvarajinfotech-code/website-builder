from sqlalchemy import Column, Integer, String, Boolean, Text
from app.utils.database import Base

class FooterHeaderModel(Base):
    __tablename__ = "footer_header"

    ID = Column(Integer, primary_key=True, index=True)
    TAGLINE = Column(String(255), nullable=False)
    SHOW_NEWSLETTER = Column(Boolean, nullable=False)
    NEWSLETTER_HEADER_TEXT = Column(String(255), nullable=True)
    NEWSLETTER_TAGLINE = Column(String(255), nullable=True)
    COPYRIGHT_TEXT = Column(Text, nullable=False)
