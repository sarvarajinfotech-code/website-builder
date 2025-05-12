from sqlalchemy import Column, Integer, String, LargeBinary
import zlib
import base64
from app.utils.database import Base

class PageModel(Base):
    __tablename__ = "pages"

    ID = Column(Integer, primary_key=True, index=True)
    PAGE_NAME = Column(String(255), nullable=False)
    CONTENT_HEADER = Column(String(255), nullable=False)
    CONTENT = Column(LargeBinary, nullable=False)

    def set_content(self, content: str):
        """Compress and encode content before storing."""
        self.CONTENT = zlib.compress(content.encode('utf-8'))

    def get_content(self) -> str:
        """Decompress and decode content when retrieving."""
        return zlib.decompress(self.CONTENT).decode('utf-8')

    def to_dict(self):
        """Return a dictionary representation of the PageModel with decompressed content."""
        return {
            "ID": self.ID,
            "PAGE_NAME": self.PAGE_NAME,
            "CONTENT_HEADER": self.CONTENT_HEADER,
            "CONTENT": self.get_content()  # Decompress content
        }
