from sqlalchemy.orm import Session
from app.models.favicon_settings_model import FaviconSettingsModel

# Create new favicon settings
def create_favicon_settings(db: Session, title: str, favicon_path: str):
    new_favicon_settings = FaviconSettingsModel(
        TITLE=title,
        FAVICON_PATH=favicon_path
    )
    db.add(new_favicon_settings)
    db.commit()
    db.refresh(new_favicon_settings)
    return new_favicon_settings

# Get favicon settings by ID
def get_favicon_settings(db: Session, favicon_id: int):
    return db.query(FaviconSettingsModel).filter(FaviconSettingsModel.ID == favicon_id).first()

# Get all favicon settings
def get_all_favicon_settings(db: Session):
    return db.query(FaviconSettingsModel).all()

# Update favicon settings by ID
def update_favicon_settings(db: Session, favicon_id: int, title: str, favicon_path: str):
    favicon_settings = db.query(FaviconSettingsModel).filter(FaviconSettingsModel.ID == favicon_id).first()
    if favicon_settings:
        favicon_settings.TITLE = title
        favicon_settings.FAVICON_PATH = favicon_path
        db.commit()
        db.refresh(favicon_settings)
        return favicon_settings
    return None

# Delete favicon settings by ID
def delete_favicon_settings(db: Session, favicon_id: int):
    favicon_settings = db.query(FaviconSettingsModel).filter(FaviconSettingsModel.ID == favicon_id).first()
    if favicon_settings:
        db.delete(favicon_settings)
        db.commit()
        return favicon_settings
    return None
