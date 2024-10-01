from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class BlogModel(Base):
    __tablename__ = "blogs"

    ID = Column(Integer, primary_key=True, index=True)
    BLOG_NAME = Column(String(255), index=True)
    BLOG_DESCRIPTION = Column(Text)
    AUTHOR_NAME = Column(String(255))
    AUTHOR_IMAGE = Column(String(255))
