from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.why_choose_us_service import (
    create_why_choose_us,
    get_why_choose_us,
    get_all_why_choose_us,
    update_why_choose_us,
    delete_why_choose_us
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for "Why Choose Us" input
class WhyChooseUsCreate(BaseModel):
    header: str
    explanation: str

# Create new "Why Choose Us" entry and upload the image
@router.post("/why-choose-us/")
async def create_new_why_choose_us(
    header: str = Form(...),
    explanation: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Create new entry in the database
    new_entry = create_why_choose_us(db, header, explanation, "")

    # Save the uploaded image and generate the image path
    image_path = save_file(file, f"reason_{new_entry.ID}.png")

    # Update entry in the database with the image path
    updated_entry = update_why_choose_us(db, new_entry.ID, header, explanation, "/" + image_path)

    return {"detail": "Why Choose Us entry created successfully", "entry_id": updated_entry.ID}

# Get "Why Choose Us" entry by ID
@router.get("/why-choose-us/{entry_id}")
async def read_why_choose_us_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = get_why_choose_us(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Why Choose Us entry not found")
    return entry

# Get all "Why Choose Us" entries
@router.get("/why-choose-us/")
async def read_all_why_choose_us_entries(db: Session = Depends(get_db)):
    return get_all_why_choose_us(db)

# Update "Why Choose Us" entry
@router.put("/why-choose-us/{entry_id}")
async def update_why_choose_us_entry(
    entry_id: int,
    header: str = Form(...),
    explanation: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    entry = get_why_choose_us(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Why Choose Us entry not found")

    # Use the existing image path if no new image is uploaded
    image_path = entry.IMAGE
    if file:
        image_path = save_file(file, f"reason_{entry_id}.png")

    # Update entry in the database
    updated_entry = update_why_choose_us(db, entry_id, header, explanation, "/" + image_path)

    return {"detail": "Why Choose Us entry updated successfully", "entry": updated_entry}

# Delete "Why Choose Us" entry
@router.delete("/why-choose-us/{entry_id}")
async def delete_why_choose_us_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = get_why_choose_us(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Why Choose Us entry not found")

    # Delete the entry from the database
    deleted_entry = delete_why_choose_us(db, entry_id)
    if not deleted_entry:
        raise HTTPException(status_code=404, detail="Why Choose Us entry not found")

    # Optionally delete the image file from the public folder
    delete_file(entry.IMAGE)

    return {"detail": "Why Choose Us entry deleted successfully"}
