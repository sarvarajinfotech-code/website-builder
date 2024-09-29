from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class FaviconSettingsModel(Base):
    __tablename__ = "favicon_settings"

    ID = Column(Integer, primary_key=True, index=True)
    TITLE = Column(String(255), nullable=False)
    FAVICON_PATH = Column(String(255), nullable=False)
