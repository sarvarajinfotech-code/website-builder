from sqlalchemy import Column, Integer, String, LargeBinary, DateTime
import zlib
from app.utils.database import Base
from datetime import datetime

class BlogModel(Base):
    __tablename__ = "blogs"

    ID = Column(Integer, primary_key=True, index=True)
    BLOG_NAME = Column(String(255), index=True)
    BLOG_DESCRIPTION = Column(LargeBinary)  # Changed to LargeBinary
    AUTHOR_NAME = Column(String(255))
    AUTHOR_IMAGE = Column(String(255))
    CREATED_DATE = Column(DateTime, default=datetime.utcnow)
    CATEGORY = Column(String(255))

    def set_blog_description(self, description: str):
        """Compress and encode blog description before storing."""
        self.BLOG_DESCRIPTION = zlib.compress(description.encode('utf-8'))

    def get_blog_description(self) -> str:
        """Decompress and decode blog description when retrieving."""
        if self.BLOG_DESCRIPTION is None:
            return ""  # Return an empty string if BLOG_DESCRIPTION is None
        return zlib.decompress(self.BLOG_DESCRIPTION).decode('utf-8')

    def to_dict(self):
        """Return a dictionary representation of the BlogModel with decompressed blog description."""
        return {
            "ID": self.ID,
            "BLOG_NAME": self.BLOG_NAME,
            "BLOG_DESCRIPTION": self.get_blog_description(),  # Decompress blog description
            "AUTHOR_NAME": self.AUTHOR_NAME,
            "AUTHOR_IMAGE": self.AUTHOR_IMAGE,
            "CREATED_DATE": self.CREATED_DATE,
            "CATEGORY": self.CATEGORY
        }
