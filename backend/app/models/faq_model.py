from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class FAQModel(Base):
    __tablename__ = "faq"

    ID = Column(Integer, primary_key=True, index=True)
    QUESTION = Column(String(255), nullable=False)
    ANSWER = Column(Text, nullable=False)
