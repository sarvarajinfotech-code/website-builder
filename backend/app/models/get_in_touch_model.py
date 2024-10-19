from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class GetInTouchFormModel(Base):
    __tablename__ = "get_in_touch"

    ID = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)  
    last_name = Column(String(100), nullable=False)   
    email = Column(String(255), nullable=False)        
    phone_number = Column(String(20), nullable=True)   
    query = Column(String(500), nullable=False)        

