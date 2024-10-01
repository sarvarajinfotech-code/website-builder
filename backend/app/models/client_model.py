from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class ClientModel(Base):
    __tablename__ = "clients"

    ID = Column(Integer, primary_key=True, index=True)
    CLIENT_NAME = Column(String(255), nullable=False)
    CLIENT_LOGO = Column(String(255), nullable=True)  # Path to the logo image