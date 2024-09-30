from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class HeaderInfo(Base):
    __tablename__ = "header_info"

    ID = Column(Integer, primary_key=True, index=True)
    HEADER_TEXT = Column(String(255), nullable=False)
    TAG_LINE = Column(String(255), nullable=False)
    PAGE = Column(String(100), nullable=False)
