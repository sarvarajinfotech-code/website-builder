from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# DATABASE_URL = f"mysql+pymysql://avekshaa:avekshaa@localhost:{settings.db_port}/website_builder"
DATABASE_URL = f"mysql+pymysql://freedb_avekshaa:tqw8j%40F6DuhKRc&@sql.freedb.tech:{settings.db_port}/freedb_website_builder"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
