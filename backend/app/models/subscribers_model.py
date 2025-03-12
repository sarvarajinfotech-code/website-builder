from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.utils.database import Base

class SubscriberModel(Base):
    __tablename__ = "subscribers"

    ID = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
