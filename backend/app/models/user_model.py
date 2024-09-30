from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class User(Base):
    __tablename__ = 'users'

    USER_ID = Column(Integer, primary_key=True, index=True)
    USER_NAME = Column(String(255), unique=True, nullable=False)
    PASSWORD = Column(String(255), nullable=False)
    ROLE = Column(String(50), nullable=False)
