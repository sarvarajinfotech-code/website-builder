from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.utils.database import Base

class HomePageSettingsModel(Base):
    __tablename__ = 'home_page_settings'

    ID = Column(Integer, primary_key=True, index=True)
    HEADER_TEXT = Column(String(255), nullable=True)
    HEADER_TEXT_ALIGNMENT = Column(Enum('left', 'right', 'center', name='alignment_enum'), default='left')
    TAGLINE_TEXT = Column(String(255), nullable=True)
    TAGLINE_ALIGNMENT = Column(Enum('left', 'right', 'center', name='alignment_enum'), default='left')
    PRIMARY_BUTTON_TEXT = Column(String(255), nullable=True)
    PRIMARY_BUTTON_LINK = Column(String(255), nullable=True)
    PRIMARY_BUTTON_TYPE = Column(String(50), nullable=True)
    SECONDARY_BUTTON_TEXT = Column(String(255), nullable=True)
    SECONDARY_BUTTON_LINK = Column(String(255), nullable=True)
    SECONDARY_BUTTON_TYPE = Column(Enum('video', 'link', name='button_type_enum'), default='link')
    SHOW_IN_SLIDER = Column(Boolean, default=False)
    OPACITY = Column(Integer, nullable=False)
    BACKGROUND_IMAGE_PATH = Column(String(255), default="")
