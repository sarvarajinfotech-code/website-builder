from sqlalchemy import Column, Integer, String, Boolean, DECIMAL, Text
from app.utils.database import Base

class PriceModel(Base):
    __tablename__ = "price"

    ID = Column(Integer, primary_key=True, index=True)
    PRICE_TAGLINE = Column(String(255), nullable=False)
    PLAN_TYPE = Column(String(255), nullable=False)
    CURRENCY_TYPE = Column(String(10), nullable=False)
    PRICE = Column(DECIMAL(10, 2), nullable=False)
    OFFER = Column(Boolean, nullable=False)
    OFFER_PRICE = Column(DECIMAL(10, 2), nullable=True)
    FEATURES_INCLUDED = Column(Text, nullable=True)
    FEATURES_EXCLUDED = Column(Text, nullable=True)
    CTA_BUTTON_TEXT = Column(String(255), nullable=True)
    CTA_BUTTON_LINK = Column(String(255), nullable=True)
