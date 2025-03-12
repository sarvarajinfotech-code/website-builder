from sqlalchemy import Column, String
from app.utils.database import Base

class SeoTagsModel(Base):
    __tablename__ = "seo_tags"

    section = Column(String(255), primary_key=True)
    title = Column(String(255))
    description = Column(String(255))
    keywords = Column(String(255))
