from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.faq_service import (
    create_faq,
    get_faq,
    get_all_faqs,
    update_faq,
    delete_faq
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for FAQ input
class FAQCreate(BaseModel):
    question: str
    answer: str

# Create a new FAQ entry
@router.post("/faq/")
async def create_new_faq(faq: FAQCreate, db: Session = Depends(get_db)):
    return create_faq(
        db,
        faq.question,
        faq.answer
    )

# Get an FAQ entry by ID
@router.get("/faq/{faq_id}")
async def read_faq(faq_id: int, db: Session = Depends(get_db)):
    faq = get_faq(db, faq_id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ entry not found")
    return faq

# Get all FAQ entries
@router.get("/faq/")
async def read_all_faqs(db: Session = Depends(get_db)):
    return get_all_faqs(db)

# Update an FAQ entry by ID
@router.put("/faq/{faq_id}")
async def update_faq_entry(faq_id: int, faq: FAQCreate, db: Session = Depends(get_db)):
    updated_faq = update_faq(
        db,
        faq_id,
        faq.question,
        faq.answer
    )
    if not updated_faq:
        raise HTTPException(status_code=404, detail="FAQ entry not found")
    return updated_faq

# Delete an FAQ entry by ID
@router.delete("/faq/{faq_id}")
async def delete_faq_entry(faq_id: int, db: Session = Depends(get_db)):
    deleted_faq = delete_faq(db, faq_id)
    if not deleted_faq:
        raise HTTPException(status_code=404, detail="FAQ entry not found")
    return {"detail": "FAQ entry deleted successfully"}
