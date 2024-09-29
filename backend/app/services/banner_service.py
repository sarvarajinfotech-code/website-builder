from sqlalchemy.orm import Session
from app.models.banner_model import BannerModel

# Create new banner
def create_banner(db: Session, banner_text: str, banner_button_text: str, button_link: str):
    new_banner = BannerModel(
        BANNER_TEXT=banner_text,
        BANNER_BUTTON_TEXT=banner_button_text,
        BUTTON_LINK=button_link
    )
    db.add(new_banner)
    db.commit()
    db.refresh(new_banner)
    return new_banner

# Get banner by ID
def get_banner(db: Session, banner_id: int):
    return db.query(BannerModel).filter(BannerModel.ID == banner_id).first()

# Get all banners
def get_all_banners(db: Session):
    return db.query(BannerModel).all()

# Update banner by ID
def update_banner(db: Session, banner_id: int, banner_text: str, banner_button_text: str, button_link: str):
    banner = db.query(BannerModel).filter(BannerModel.ID == banner_id).first()
    if banner:
        banner.BANNER_TEXT = banner_text
        banner.BANNER_BUTTON_TEXT = banner_button_text
        banner.BUTTON_LINK = button_link
        db.commit()
        db.refresh(banner)
        return banner
    return None

# Delete banner by ID
def delete_banner(db: Session, banner_id: int):
    banner = db.query(BannerModel).filter(BannerModel.ID == banner_id).first()
    if banner:
        db.delete(banner)
        db.commit()
        return banner
    return None
