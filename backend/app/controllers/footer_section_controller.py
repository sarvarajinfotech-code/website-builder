from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.footer_section_service import (
    create_footer_section,
    get_footer_section,
    get_all_footer_sections,
    update_footer_section,
    delete_footer_section
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for footer section input
class FooterSectionCreate(BaseModel):
    section_header: str
    section_item_name: str
    link_type: str
    link: str

# Create a new footer section entry
@router.post("/footer_section/")
async def create_new_footer_section(footer_section: FooterSectionCreate, db: Session = Depends(get_db)):
    return create_footer_section(
        db,
        footer_section.section_header,
        footer_section.section_item_name,
        footer_section.link_type,
        footer_section.link
    )

# Get a footer section entry by ID
@router.get("/footer_section/{footer_section_id}")
async def read_footer_section(footer_section_id: int, db: Session = Depends(get_db)):
    footer_section = get_footer_section(db, footer_section_id)
    if not footer_section:
        raise HTTPException(status_code=404, detail="Footer section entry not found")
    return footer_section

# Get all footer section entries
@router.get("/footer_section/")
async def read_all_footer_sections(db: Session = Depends(get_db)):
    return get_all_footer_sections(db)

# Update a footer section entry by ID
@router.put("/footer_section/{footer_section_id}")
async def update_footer_section_entry(footer_section_id: int, footer_section: FooterSectionCreate, db: Session = Depends(get_db)):
    updated_footer_section = update_footer_section(
        db,
        footer_section_id,
        footer_section.section_header,
        footer_section.section_item_name,
        footer_section.link_type,
        footer_section.link
    )
    if not updated_footer_section:
        raise HTTPException(status_code=404, detail="Footer section entry not found")
    return updated_footer_section

# Delete a footer section entry by ID
@router.delete("/footer_section/{footer_section_id}")
async def delete_footer_section_entry(footer_section_id: int, db: Session = Depends(get_db)):
    deleted_footer_section = delete_footer_section(db, footer_section_id)
    if not deleted_footer_section:
        raise HTTPException(status_code=404, detail="Footer section entry not found")
    return {"detail": "Footer section entry deleted successfully"}
