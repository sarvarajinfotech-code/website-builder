from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class TeamModel(Base):
    __tablename__ = "team"

    ID = Column(Integer, primary_key=True, index=True)
    EMPLOYEE_NAME = Column(String(255), nullable=False)
    DESIGNATION = Column(String(255), nullable=False)
    LINKEDIN_PROFILE = Column(String(255))
    TWITTER_PROFILE = Column(String(255))
    PHOTO_PATH = Column(String(255))  # Path to the employee's photo