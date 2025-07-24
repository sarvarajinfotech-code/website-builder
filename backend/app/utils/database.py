from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# from config import settings

DATABASE_URL = "mysql+pymysql://vijay:vijay1234@localhost:1433/website_builder"
# DATABASE_URL = "mysql+pymysql://provolqc_babu:Babureddys%401@localhost:3306/provolqc_websitebuilder"
# DATABASE_URL = "postgresql://postgres.tjopfivhrqypjpatvlvz:Babureddys%401@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
# DATABASE_URL = f"mysql+pymysql://app_user:your_password@82.180.147.140:3306/my_app_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
