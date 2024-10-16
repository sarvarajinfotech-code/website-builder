from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class ContactModel(Base):
    __tablename__ = "contact"

    ID = Column(Integer, primary_key=True, index=True)
    HEADER = Column(String(255), nullable=False)
    TAGLINE = Column(String(255), nullable=False)
    PHONE_NUMBER = Column(String(20), nullable=False)  # Adjust the length as needed
    ADDRESS = Column(Text, nullable=False)
    EMAIL = Column(String(255), nullable=False)
