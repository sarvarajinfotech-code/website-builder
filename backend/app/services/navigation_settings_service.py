from sqlalchemy.orm import Session
from app.models.navigation_settings_model import NavigationSettingsModel

def create_navigation_settings(db: Session, logo: str, dark_mode: bool) -> NavigationSettingsModel:
    db_navigation = NavigationSettingsModel(LOGO=logo, DARK_MODE=dark_mode)
    db.add(db_navigation)
    db.commit()
    db.refresh(db_navigation)
    return db_navigation

def get_navigation_settings(db: Session, navigation_id: int) -> NavigationSettingsModel:
    return db.query(NavigationSettingsModel).filter(NavigationSettingsModel.ID == navigation_id).first()

def get_all_navigation_settings(db: Session):
    return db.query(NavigationSettingsModel).all()

def update_navigation_settings(db: Session, navigation_id: int, logo: str, dark_mode: bool) -> NavigationSettingsModel:
    navigation_settings = db.query(NavigationSettingsModel).filter(NavigationSettingsModel.ID == navigation_id).first()
    if navigation_settings:
        navigation_settings.LOGO = logo
        navigation_settings.DARK_MODE = dark_mode
        db.commit()
        db.refresh(navigation_settings)
    return navigation_settings

def delete_navigation_settings(db: Session, navigation_id: int) -> bool:
    navigation_settings = db.query(NavigationSettingsModel).filter(NavigationSettingsModel.ID == navigation_id).first()
    if navigation_settings:
        db.delete(navigation_settings)
        db.commit()
        return True
    return False
