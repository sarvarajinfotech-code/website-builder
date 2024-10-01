from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class TestimonialModel(Base):
    __tablename__ = "testimonials"

    ID = Column(Integer, primary_key=True, index=True)
    PERSON_NAME = Column(String(255), index=True)
    DESIGNATION = Column(String(255))
    PERSON_PHOTO = Column(String(255))
    REVIEW = Column(Text)
