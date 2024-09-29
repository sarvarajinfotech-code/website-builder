from sqlalchemy import Column, Integer, String, Boolean
from app.utils.database import Base

class NavigationSettingsModel(Base):
    __tablename__ = "navigation_settings"

    ID = Column(Integer, primary_key=True, index=True)
    LOGO = Column(String(255), nullable=False)
    DARK_MODE = Column(Boolean, nullable=False)
