from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class FooterSectionModel(Base):
    __tablename__ = "footer_section"

    ID = Column(Integer, primary_key=True, index=True)
    SECTION_HEADER = Column(String(255), nullable=False)
    SECTION_ITEM_NAME = Column(String(255), nullable=False)
    LINK_TYPE = Column(String(50), nullable=False)
    LINK = Column(String(255), nullable=False)
