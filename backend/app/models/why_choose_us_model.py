from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class WhyChooseUsModel(Base):
    __tablename__ = "why_choose_us"

    ID = Column(Integer, primary_key=True, index=True)
    HEADER = Column(String(255), index=True)
    EXPLANATION = Column(Text)
    IMAGE = Column(String(255))
