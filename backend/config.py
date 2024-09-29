from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

class Settings(BaseSettings):
    db_user: str = "avekshaa"
    db_password: str = "avekshaa"
    db_host: str = "localhost"
    db_port: str = "5432"  # Default value if not in .env
    db_name: str = "website_builder"

    class Config:
        env_file = ".env"  

settings = Settings()

