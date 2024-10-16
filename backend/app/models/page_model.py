from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class PageModel(Base):
    __tablename__ = "pages"

    ID = Column(Integer, primary_key=True, index=True)
    PAGE_NAME = Column(String(255), nullable=False)
    CONTENT_HEADER = Column(String(255), nullable=False)
    CONTENT = Column(Text, nullable=False)
