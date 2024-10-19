from sqlalchemy import Column, Integer, String, Boolean, event
from app.utils.database import Base
from sqlalchemy.orm import Session

class PathModel(Base):
    __tablename__ = "paths"

    ID = Column(Integer, primary_key=True, index=True)
    PAGE_NAME = Column(String(255), nullable=False)
    PAGE_PATH = Column(String(255), nullable=False)
    SHOW = Column(Boolean, default=True, nullable=False)
    DISABLED = Column(Boolean, default=False, nullable=False)
    DYNAMIC_PAGE_ID = Column(Integer, default=0, nullable=True)


# Updated default paths, ignoring the `id` and maintaining the order
default_paths = [
    {"PAGE_NAME": "Home", "PAGE_PATH": "/", "SHOW": True, "DISABLED": True},
    {"PAGE_NAME": "Clients", "PAGE_PATH": "/clients", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Why Choose Us", "PAGE_PATH": "/why-choose-us", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Team", "PAGE_PATH": "/team", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Testimonials", "PAGE_PATH": "/testimonials", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Pricing", "PAGE_PATH": "/pricing", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Products", "PAGE_PATH": "/products", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Services", "PAGE_PATH": "/services", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Contact", "PAGE_PATH": "/contact", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "FAQ", "PAGE_PATH": "/faq", "SHOW": True, "DISABLED": False},
    {"PAGE_NAME": "Blogs", "PAGE_PATH": "/blogs", "SHOW": True, "DISABLED": False},

]

# Function to add default entries to the Paths table
def insert_default_paths(target, connection, **kwargs):
    session = Session(bind=connection)
    for path in default_paths:
        if not session.query(PathModel).filter_by(PAGE_PATH=path["PAGE_PATH"]).first():
            new_path = PathModel(**path)
            session.add(new_path)
    session.commit()

# Listen for the 'after_create' event to insert default paths
event.listen(PathModel.__table__, "after_create", insert_default_paths)
