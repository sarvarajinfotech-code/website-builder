from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.footer_header_service import (
    create_footer_header,
    get_footer_header,
    get_all_footer_headers,
    update_footer_header,
    delete_footer_header
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for footer header input
class FooterHeaderCreate(BaseModel):
    tagline: str
    show_newsletter: bool
    newsletter_header_text: str = None
    newsletter_tagline: str = None
    copyright_text: str

# Create a new footer header entry
@router.post("/footer_header/")
async def create_new_footer_header(footer_header: FooterHeaderCreate, db: Session = Depends(get_db)):
    return create_footer_header(
        db,
        footer_header.tagline,
        footer_header.show_newsletter,
        footer_header.newsletter_header_text,
        footer_header.newsletter_tagline,
        footer_header.copyright_text
    )

# Get a footer header entry by ID
@router.get("/footer_header/{footer_header_id}")
async def read_footer_header(footer_header_id: int, db: Session = Depends(get_db)):
    footer_header = get_footer_header(db, footer_header_id)
    if not footer_header:
        raise HTTPException(status_code=404, detail="Footer header entry not found")
    return footer_header

# Get all footer header entries
@router.get("/footer_header/")
async def read_all_footer_headers(db: Session = Depends(get_db)):
    return get_all_footer_headers(db)

# Update a footer header entry by ID
@router.put("/footer_header/{footer_header_id}")
async def update_footer_header_entry(footer_header_id: int, footer_header: FooterHeaderCreate, db: Session = Depends(get_db)):
    updated_footer_header = update_footer_header(
        db,
        footer_header_id,
        footer_header.tagline,
        footer_header.show_newsletter,
        footer_header.newsletter_header_text,
        footer_header.newsletter_tagline,
        footer_header.copyright_text
    )
    if not updated_footer_header:
        raise HTTPException(status_code=404, detail="Footer header entry not found")
    return updated_footer_header

# Delete a footer header entry by ID
@router.delete("/footer_header/{footer_header_id}")
async def delete_footer_header_entry(footer_header_id: int, db: Session = Depends(get_db)):
    deleted_footer_header = delete_footer_header(db, footer_header_id)
    if not deleted_footer_header:
        raise HTTPException(status_code=404, detail="Footer header entry not found")
    return {"detail": "Footer header entry deleted successfully"}
