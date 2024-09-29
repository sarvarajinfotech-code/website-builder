from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class BannerModel(Base):
    __tablename__ = "banner"

    ID = Column(Integer, primary_key=True, index=True)
    BANNER_TEXT = Column(String(255), nullable=False)
    BANNER_BUTTON_TEXT = Column(String(255), nullable=False)
    BUTTON_LINK = Column(String(255), nullable=False)
