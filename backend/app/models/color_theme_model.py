from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class ColorThemeModel(Base):
    __tablename__ = "color_theme"

    ID = Column(Integer, primary_key=True, index=True)
    COLOR1 = Column(String(10), nullable=False)
    COLOR2 = Column(String(10), nullable=False)
    COLOR3 = Column(String(10), nullable=False)
