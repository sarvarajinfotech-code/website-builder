from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class ProductCategoryModel(Base):
    __tablename__ = "product_category"

    ID = Column(Integer, primary_key=True, index=True)
    CATEGORY_NAME = Column(String(255), nullable=False)
