from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class PricePlanType(Base):
    __tablename__ = "price_plan_type"
    
    ID = Column(Integer, primary_key=True, index=True)
    PLAN_TYPE = Column(String(255), nullable=False)
