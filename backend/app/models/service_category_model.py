from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class ServiceCategoryModel(Base):
    __tablename__ = "service_category"

    ID = Column(Integer, primary_key=True, index=True)
    CATEGORY_NAME = Column(String(255), nullable=False)
