from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.banner_service import (
    create_banner,
    get_banner,
    get_all_banners,
    update_banner,
    delete_banner
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for banner input
class BannerCreate(BaseModel):
    banner_text: str
    banner_button_text: str
    button_link: str

# Create new banner
@router.post("/banners/")
async def create_new_banner(banner: BannerCreate, db: Session = Depends(get_db)):
    return create_banner(
        db,
        banner.banner_text,
        banner.banner_button_text,
        banner.button_link
    )

# Get banner by ID
@router.get("/banners/{banner_id}")
async def read_banner(banner_id: int, db: Session = Depends(get_db)):
    banner = get_banner(db, banner_id)
    if not banner:
        raise HTTPException(status_code=404, detail="Banner entry not found")
    return banner

# Get all banners
@router.get("/banners/")
async def read_all_banners(db: Session = Depends(get_db)):
    return get_all_banners(db)

# Update banner by ID
@router.put("/banners/{banner_id}")
async def update_banner_entry(banner_id: int, banner: BannerCreate, db: Session = Depends(get_db)):
    updated_banner = update_banner(
        db,
        banner_id,
        banner.banner_text,
        banner.banner_button_text,
        banner.button_link
    )
    if not updated_banner:
        raise HTTPException(status_code=404, detail="Banner entry not found")
    return updated_banner

# Delete banner entry by ID
@router.delete("/banners/{banner_id}")
async def delete_banner_entry(banner_id: int, db: Session = Depends(get_db)):
    deleted_banner = delete_banner(db, banner_id)
    if not deleted_banner:
        raise HTTPException(status_code=404, detail="Banner entry not found")
    return {"detail": "Banner entry deleted successfully"}
