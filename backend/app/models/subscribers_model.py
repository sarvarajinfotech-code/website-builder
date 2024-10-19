from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class SubscriberModel(Base):
    __tablename__ = "subscribers"

    ID = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
