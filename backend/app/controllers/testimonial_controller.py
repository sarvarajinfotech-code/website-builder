from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.testimonial_service import (
    create_testimonial,
    get_testimonial,
    get_all_testimonials,
    update_testimonial,
    delete_testimonial
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for testimonial input
class TestimonialCreate(BaseModel):
    person_name: str
    designation: str
    review: str

# Create new testimonial and upload the person's photo
@router.post("/testimonials/")
async def create_new_testimonial(
    person_name: str = Form(...),
    designation: str = Form(...),
    review: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
     # Create new testimonial in the database
    new_testimonial = create_testimonial(db, person_name, designation, "", review)

    # Save the uploaded person's photo and generate the photo path
    person_photo_path = save_file(file, f"testimonial_{new_testimonial.ID}.png")
    
    # Create new testimonial in the database
    new_testimonial = update_testimonial(db, new_testimonial.ID, person_name, designation, person_photo_path, review)
   
    return {"detail": "Testimonial created successfully", "testimonial_id": new_testimonial.ID}

# Get testimonial by ID
@router.get("/testimonials/{testimonial_id}")
async def read_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = get_testimonial(db, testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial

# Get all testimonials
@router.get("/testimonials/")
async def read_all_testimonials(db: Session = Depends(get_db)):
    return get_all_testimonials(db)

# Update testimonial
@router.put("/testimonials/{testimonial_id}")
async def update_testimonial_entry(
    testimonial_id: int,
    person_name: str = Form(...),
    designation: str = Form(...),
    review: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    testimonial = get_testimonial(db, testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    # Use the existing photo path if no new photo is uploaded
    person_photo_path = testimonial.PERSON_PHOTO
    if file:
        person_photo_path = save_file(file, f"testimonial_{testimonial_id}.png")

    # Update testimonial in the database
    updated_testimonial = update_testimonial(db, testimonial_id, person_name, designation, person_photo_path, review)

    return {"detail": "Testimonial updated successfully", "testimonial": updated_testimonial}

# Delete testimonial
@router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial_entry(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = get_testimonial(db, testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    # Delete the testimonial from the database
    deleted_testimonial = delete_testimonial(db, testimonial_id)
    if not deleted_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    # Optionally delete the photo file from the public folder
    delete_file(testimonial.PERSON_PHOTO)

    return {"detail": "Testimonial deleted successfully"}
