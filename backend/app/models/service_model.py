from sqlalchemy import Column, Integer, String, Text, Boolean
from app.utils.database import Base

class ServiceModel(Base):
    __tablename__ = "service"

    ID = Column(Integer, primary_key=True, index=True)
    SERVICE_NAME = Column(String(255), nullable=False)
    SERVICE_CATEGORY = Column(String(255), nullable=False)
    SVG_ICON = Column(Text, nullable=True)
    SERVICE_DESCRIPTION = Column(Text, nullable=True)
    LEARN_MORE = Column(Boolean, nullable=False, default=False)
    LEARN_MORE_LINK = Column(String(255), nullable=True)
