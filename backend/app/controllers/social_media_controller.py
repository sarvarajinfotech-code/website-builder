from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.social_media_service import (
    create_social_media,
    get_social_media,
    get_all_social_media,
    update_social_media,
    delete_social_media
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for social media input
class SocialMediaCreate(BaseModel):
    media_name: str
    svg_icon: str
    link: str

# Create a new social media entry
@router.post("/social-media/")
async def create_new_social_media(social_media: SocialMediaCreate, db: Session = Depends(get_db)):
    return create_social_media(
        db,
        social_media.media_name,
        social_media.svg_icon,
        social_media.link
    )

# Get a social media entry by ID
@router.get("/social-media/{media_id}")
async def read_social_media(media_id: int, db: Session = Depends(get_db)):
    media = get_social_media(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Social media entry not found")
    return media

# Get all social media entries
@router.get("/social-media/")
async def read_all_social_media(db: Session = Depends(get_db)):
    return get_all_social_media(db)

# Update a social media entry by ID
@router.put("/social-media/{media_id}")
async def update_social_media_entry(media_id: int, social_media: SocialMediaCreate, db: Session = Depends(get_db)):
    updated_media = update_social_media(
        db,
        media_id,
        social_media.media_name,
        social_media.svg_icon,
        social_media.link
    )
    if not updated_media:
        raise HTTPException(status_code=404, detail="Social media entry not found")
    return updated_media

# Delete a social media entry by ID
@router.delete("/social-media/{media_id}")
async def delete_social_media_entry(media_id: int, db: Session = Depends(get_db)):
    deleted_media = delete_social_media(db, media_id)
    if not deleted_media:
        raise HTTPException(status_code=404, detail="Social media entry not found")
    return {"detail": "Social media entry deleted successfully"}
