from sqlalchemy.orm import Session
from app.models.social_media_model import SocialMediaModel

# Create a new social media entry
def create_social_media(db: Session, media_name: str, svg_icon: str, link: str):
    new_social_media = SocialMediaModel(
        MEDIA_NAME=media_name,
        SVG_ICON=svg_icon,
        LINK=link
    )
    db.add(new_social_media)
    db.commit()
    db.refresh(new_social_media)
    return new_social_media

# Get social media by ID
def get_social_media(db: Session, media_id: int):
    return db.query(SocialMediaModel).filter(SocialMediaModel.ID == media_id).first()

# Get all social media entries
def get_all_social_media(db: Session):
    return db.query(SocialMediaModel).all()

# Update social media by ID
def update_social_media(db: Session, media_id: int, media_name: str, svg_icon: str, link: str):
    media = db.query(SocialMediaModel).filter(SocialMediaModel.ID == media_id).first()
    if media:
        media.MEDIA_NAME = media_name
        media.SVG_ICON = svg_icon
        media.LINK = link
        db.commit()
        db.refresh(media)
        return media
    return None

# Delete social media by ID
def delete_social_media(db: Session, media_id: int):
    media = db.query(SocialMediaModel).filter(SocialMediaModel.ID == media_id).first()
    if media:
        db.delete(media)
        db.commit()
        return media
    return None
