from sqlalchemy import Column, Integer, String, Text,DateTime
from app.utils.database import Base
from datetime import datetime


class BlogModel(Base):
    __tablename__ = "blogs"

    ID = Column(Integer, primary_key=True, index=True)
    BLOG_NAME = Column(String(255), index=True)
    BLOG_DESCRIPTION = Column(Text)
    AUTHOR_NAME = Column(String(255))
    AUTHOR_IMAGE = Column(String(255))
    CREATED_DATE = Column(DateTime, default=datetime.utcnow)
    CATEGORY = Column(String(255))
