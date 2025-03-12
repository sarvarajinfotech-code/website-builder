from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.seo_tags_service import (
    create_seo_tag,
    get_seo_tag,
    get_all_seo_tags,
    update_seo_tag,
    delete_seo_tag
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for SEO tag input
class SeoTagCreate(BaseModel):
    section: str
    title: str
    description: str
    keywords: str

# Create new SEO tag
@router.post("/seo_tags/")
async def create_new_seo_tag(seo_tag: SeoTagCreate, db: Session = Depends(get_db)):
    return create_seo_tag(
        db,
        seo_tag.section,
        seo_tag.title,
        seo_tag.description,
        seo_tag.keywords
    )

# Get SEO tag by section
@router.get("/seo_tags/{section}")
async def read_seo_tag(section: str, db: Session = Depends(get_db)):
    seo_tag = get_seo_tag(db, section)
    if not seo_tag:
        raise HTTPException(status_code=404, detail="SEO tag not found")
    return seo_tag

# Get all SEO tags
@router.get("/seo_tags/")
async def read_all_seo_tags(db: Session = Depends(get_db)):
    return get_all_seo_tags(db)

# Update SEO tag by section
@router.put("/seo_tags/{section}")
async def update_seo_tag_entry(section: str, seo_tag: SeoTagCreate, db: Session = Depends(get_db)):
    updated_seo_tag = update_seo_tag(
        db,
        section,
        seo_tag.title,
        seo_tag.description,
        seo_tag.keywords
    )
    if not updated_seo_tag:
        raise HTTPException(status_code=404, detail="SEO tag not found")
    return updated_seo_tag

# Delete SEO tag by section
@router.delete("/seo_tags/{section}")
async def delete_seo_tag_entry(section: str, db: Session = Depends(get_db)):
    deleted_seo_tag = delete_seo_tag(db, section)
    if not deleted_seo_tag:
        raise HTTPException(status_code=404, detail="SEO tag not found")
    return {"detail": "SEO tag deleted successfully"}
